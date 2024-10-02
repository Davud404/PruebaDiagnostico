import 'package:mapa_lugares/conexion/Conexion.dart';
import 'package:mapa_lugares/conexion/RespuestaGenerica.dart';

class Solicitud {
  Conexion c = Conexion();

  Future<RespuestaGenerica> listarLugaresPorTipo(tipo)async{
    return await c.solicitud_get('/lugar/$tipo');
  }
}