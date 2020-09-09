var idPelicula=0;
var indice=0;
var row="";

$(document).ready(function () {

    $("#warning").hide();

    get();

    $("#add").click(function(){
        $("#exampleModalLong").modal('show');
        idPelicula=0;
    });

    $('body').on('click', '#edit', function(){


        table = $('#table').DataTable();
        data = table.row($(this).closest("tr").get(0)).data();
        row=$(this).closest("tr").get(0);
        idPelicula=data[1];
        indice=data[0];

        $("#exampleModalLong").modal('show');

     
    });

    $('body').on('click', '#delete', function(){
        $('#table').DataTable().row($(this).closest("tr").get(0)).remove().draw();
        idPelicula=parseInt($(this).parent().parent().children('th').eq(1).text());  
        row=$(this).closest("tr").get(0);
        eliminar();
    });


    $("#enviar").click(function(){
        console.log(idPelicula);
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

function add(pelicula){

}


function get(){

    //get lists pelicualas

    peliculas = 
    [{
        id:0,
        nombre:"juan",
        edad:234
    },
    {
        id:1,
        nombre:"paco",
        edad:15
    },
    {
        id:1,
        nombre:"paco",
        edad:100
    }
    ]

    indice = 1;
    peliculas.forEach(pelicula => {

        $('#table').DataTable().row.add( [
            indice,
            pelicula.id,
            pelicula.nombre,
            pelicula.edad,
            "<button class='btn btn-danger mr-4' id='delete'>Eliminar</button> <button class='btn btn-warning mr-4' id='edit'>Editar</button>"
        ] ).draw( false );
        indice ++;
    });

    
    $('#table').DataTable();
}

