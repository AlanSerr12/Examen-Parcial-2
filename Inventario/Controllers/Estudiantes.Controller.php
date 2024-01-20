<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}


require_once('../Models/Estudiantes.model.php');
$estudiantes = new Clase_Estudiantes;
switch ($_GET["op"]) {
    case 'todos':
        $datos = array(); //defino un arreglo
        $datos = $estudiantes->todos(); //llamo al modelo de usuarios e invoco al procedimiento todos y almaceno en una variable
        while ($fila = mysqli_fetch_assoc($datos)) { //recorro el arreglo de datos
            $todos[] = $fila;
        }
        echo json_encode($todos); //devuelvo el arreglo en formato json
        break;
    case "uno":
        $ID_estudiante = $_POST["ID_estudiante"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $estudiantes->uno($ID_estudiante); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        $uno = mysqli_fetch_assoc($datos); //recorro el arreglo de datos
        echo json_encode($uno); //devuelvo el arreglo en formato json
        break;
    case 'insertar':
        $Nombre = $_POST["Nombre"];
        $Edad = $_POST["Edad"];
        $Curso = $_POST["Curso"];
        $GPA = $_POST["GPA"];


        $datos = array(); //defino un arreglo
        $datos = $estudiantes->insertar($Nombre, $Edad, $Curso, $GPA); //llamo al modelo de usuarios e invoco al procedimiento insertar
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
    case 'actualizar':
        $ID_estudiante = $_POST["ID_estudiante"];
        $Nombre = $_POST["Nombre"];
        $Edad = $_POST["Edad"];
        $Curso = $_POST["Curso"];
        $GPA = $_POST["GPA"];
        $datos = array(); //defino un arreglo
        $datos = $estudiantes->actualizar($ID_estudiante, $Nombre, $Edad, $Curso, $GPA); //llamo al modelo de usuarios e invoco al procedimiento actual
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;

    case 'eliminar':
        $ID_estudiante = $_POST["ID_estudiante"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $estudiantes->eliminar($ID_estudiante); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
}
