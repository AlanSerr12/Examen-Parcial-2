<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}


require_once('../Models/Calificaciones.model.php');
$calificaciones = new Clase_Calificaciones;
switch ($_GET["op"]) {
    case 'todos':
        $datos = array(); //defino un arreglo
        $datos = $calificaciones->todos(); //llamo al modelo de usuarios e invoco al procedimiento todos y almaceno en una variable
        while ($fila = mysqli_fetch_assoc($datos)) { //recorro el arreglo de datos
            $todos[] = $fila;
        }
        echo json_encode($todos); //devuelvo el arreglo en formato json
        break;
    case "uno":
        $ID_calificacion = $_POST["ID_calificacion"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $calificaciones->uno($ID_calificacion); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        $uno = mysqli_fetch_assoc($datos); //recorro el arreglo de datos
        echo json_encode($uno); //devuelvo el arreglo en formato json
        break;
    case 'insertar':
        $ID_estudiante = $_POST["ID_estudiante"];
        $Materia = $_POST["Materia"];
        $Nota = $_POST["Nota"];

        $datos = array(); //defino un arreglo
        $datos = $calificaciones->insertar($ID_estudiante, $Materia, $Nota); //llamo al modelo de usuarios e invoco al procedimiento insertar
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
    case 'actualizar':
        $ID_calificacion = $_POST["ID_calificacion"];
        $ID_estudiante = $_POST["ID_estudiante"];
        $Materia = $_POST["Materia"];
        $Nota = $_POST["Nota"];
        $datos = array(); //defino un arreglo
        $datos = $calificaciones->actualizar($ID_calificacion, $ID_estudiante, $Materia, $Nota); //llamo al modelo de usuarios e invoco al procedimiento actual
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;

    case 'eliminar':
        $ID_calificacion = $_POST["ID_calificacion"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $calificaciones->eliminar($ID_calificacion); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
}
