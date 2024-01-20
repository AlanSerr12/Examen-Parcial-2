<?php
require_once('../Config/cls_conexion.model.php');
class Clase_Calificaciones
{
    public function todos()
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "SELECT calificaciones.*, estudiantes.Nombre AS Nombres FROM `calificaciones` INNER JOIN estudiantes on calificaciones.ID_estudiante = estudiantes.ID_estudiante";
            $result = mysqli_query($con, $cadena);
            return $result;
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function uno($ID_calificacion)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "SELECT * FROM `calificaciones` WHERE ID_calificacion=$ID_calificacion";
            $result = mysqli_query($con, $cadena);
            return $result;
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function insertar($ID_estudiante, $Materia, $Nota)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "INSERT INTO `calificaciones`( `ID_estudiante`,`Materia`, `Nota`, `Fecha`) VALUES ('$ID_estudiante','$Materia',$Nota,CURDATE())";

            $result = mysqli_query($con, $cadena);

            return 'ok';
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function actualizar($ID_calificacion, $ID_estudiante, $Materia, $Nota)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "UPDATE `calificaciones` SET  `ID_estudiante`='$ID_estudiante',`Materia`='$Materia',`Nota`=$Nota,`Fecha`=CURDATE() WHERE `ID_calificacion`=$ID_calificacion";
            $result = mysqli_query($con, $cadena);
            return "ok";
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function eliminar($ID_calificacion)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "delete from calificaciones where ID_calificacion=$ID_calificacion";
            $result = mysqli_query($con, $cadena);
            return "ok";
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
