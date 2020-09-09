var idPelicula=0;
var indice=0;
var row="";
$(document).ready(function () {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')     
        }
    });

    $('#table').DataTable();

    $("#warning").hide();

    get();

    $("#add").click(function(){
        $("#exampleModalLong").modal('show');
        idPelicula=0;
    });

    $('body').on('click', '#edit', function(){


        table = $('#table').DataTable();
        data = table.row($(this).closest("tr").get(0)).data();
        console.log(data);
        row=$(this).closest("tr").get(0);
        idPelicula=data[1];
        indice=data[0];

        $("#exampleModalLong").modal('show');

     
    });

    $('body').on('click', '#delete', function(){
        table = $('#table').DataTable();
        data = table.row($(this).closest("tr").get(0)).data();
        idPelicula=data[1];
        eliminar();
        $('#table').DataTable().row($(this).closest("tr").get(0)).remove().draw(); table = $('#table').DataTable();
       
    });


    $("#enviar").click(function(){
        if(Number.isInteger(parseInt($("#fechaPelicula").val()))){
            if(idPelicula == 0){
                add();
            }
            else{
                editar();
            }
        }
        else{
            $("#warning").show();
        }
    });

    $("#close").click(function(){
        $("#warning").hide();
    });
    

});



function eliminar(){
    $.ajax({ url: '/peliculas/'+idPelicula, method: "DELETE" })

            
}

function editar(){
    
    $('#table').DataTable().row(row).remove().draw();

    $('#table').DataTable().row.add( [
        indice,
        idPelicula,
        $("#nombrePelicula").val(),
        $("#fechaPelicula").val(),
        "<button class='btn btn-danger mr-4' id='delete'>Eliminar</button> <button class='btn btn-warning mr-4' id='edit'>Editar</button>" 
    ] ).draw( false );
}

function add(){
    $.post("/peliculas", {Nombre: $("#nombrePelicula").val(),Fecha:$("#fechaPelicula").val()}, function(result){
        $('#table').DataTable().row.add( [
            $('#table').DataTable().rows().count()+1,
            result[0],
            result[1].Nombre,
            result[1].Fecha,
            "<button class='btn btn-danger mr-4' id='delete'>Eliminar</button> <button class='btn btn-warning mr-4' id='edit'>Editar</button>"
        ] ).draw( false );       
    });
}


function get(){
    $.get( "/peliculas", function( data ) {
        indice = 1;
        data.forEach(pelicula => {
            $('#table').DataTable().row.add( [
                indice,
                pelicula.id,
                pelicula.Nombre,
                pelicula.Fecha,
                "<button class='btn btn-danger mr-4' id='delete'>Eliminar</button> <button class='btn btn-warning mr-4' id='edit'>Editar</button>"
            ] ).draw( false );
            indice ++;
        });
    });    
}

