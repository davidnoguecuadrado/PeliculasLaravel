/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/peliculas.js":
/*!***********************************!*\
  !*** ./resources/js/peliculas.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var idPelicula = 0;
var indice = 0;
var row = "";
$(document).ready(function () {
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  $('#table').DataTable();
  $("#warning").hide();
  get();
  $("#add").click(function () {
    $("#exampleModalLong").modal('show');
    idPelicula = 0;
  });
  $('body').on('click', '#edit', function () {
    table = $('#table').DataTable();
    data = table.row($(this).closest("tr").get(0)).data();
    row = $(this).closest("tr").get(0);
    idPelicula = data[1];
    indice = data[0];
    $("#exampleModalLong").modal('show');
  });
  $('body').on('click', '#delete', function () {
    $('#table').DataTable().row($(this).closest("tr").get(0)).remove().draw();
    idPelicula = parseInt($(this).parent().parent().children('th').eq(1).text());
    row = $(this).closest("tr").get(0);
    eliminar();
  });
  $("#enviar").click(function () {
    if (Number.isInteger(parseInt($("#fechaPelicula").val()))) {
      if (idPelicula == 0) {
        add();
      } else {
        editar();
      }
    } else {
      $("#warning").show();
    }
  });
  $("#close").click(function () {
    $("#warning").hide();
  });
});

function eliminar() {}

function editar() {
  $('#table').DataTable().row(row).remove().draw();
  $('#table').DataTable().row.add([indice, idPelicula, $("#nombrePelicula").val(), $("#fechaPelicula").val(), "<button class='btn btn-danger mr-4' id='delete'>Eliminar</button> <button class='btn btn-warning mr-4' id='edit'>Editar</button>"]).draw(false);
}

function add() {
  $.post("/peliculas", {
    Nombre: $("#nombrePelicula").val(),
    Fecha: $("#fechaPelicula").val()
  }, function (result) {
    $('#table').DataTable().row.add([$('#table').DataTable().rows().count() + 1, result[0], result[1].Nombre, result[1].Fecha, "<button class='btn btn-danger mr-4' id='delete'>Eliminar</button> <button class='btn btn-warning mr-4' id='edit'>Editar</button>"]).draw(false);
  });
}

function get() {
  $.get("/peliculas", function (data) {
    indice = 1;
    data.forEach(function (pelicula) {
      $('#table').DataTable().row.add([indice, pelicula.id, pelicula.Nombre, pelicula.Fecha, "<button class='btn btn-danger mr-4' id='delete'>Eliminar</button> <button class='btn btn-warning mr-4' id='edit'>Editar</button>"]).draw(false);
      indice++;
    });
  });
}

/***/ }),

/***/ 1:
/*!*****************************************!*\
  !*** multi ./resources/js/peliculas.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\wamp\www\PeliculasLaravel\PeliculasLaravel\resources\js\peliculas.js */"./resources/js/peliculas.js");


/***/ })

/******/ });