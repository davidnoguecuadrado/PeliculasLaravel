<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Peliculas</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        
    </head>
    <body>

        <h1 class="ml-4 mt-5">Peliculas</h1>


        <button class="btn btn-secondary m-4" id="add">Añadir</button>

        <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <input type="text" class="form-control mb-3" placeholder="Nombre" aria-label="Nombre" aria-describedby="basic-addon1" id="nombrePelicula" value="">
                        <input type="text" class="form-control" placeholder="Años" aria-label="Años" aria-describedby="basic-addon1" id="fechaPelicula" value="">
                        <div class="alert alert-danger mt-4" role="alert" id="warning">
                            Por favor la edad Tiene que ser un numero
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" id="close">Close</button>
                        <button type="button" class="btn btn-primary" id="enviar">Enviar</button>
                    </div>
                </div>
            </div>
        </div>

        <table id="table" class="table display">
            <thead>
                <tr>
                    <th scope="col">Index</th>
                    <th>ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">FechaDeEstreno</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody id="tbody">
            </tbody>
        </table>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        
        <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.21/datatables.min.css"/>
 
        <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.21/datatables.min.js"></script>

        <script src="{{asset('/js/peliculas.js')}}"></script>

    </body>
</html>
