import 'package:mapa_lugares/conexion/RespuestaGenerica.dart';
import 'dart:developer';
import 'dart:convert';
import 'package:http/http.dart' as http;

class Conexion {
  //laptop
  //final String URL = "http://localhost:3000/api";
  //celular desde local
  //final String URL= "http://192.168.3.105:3000/api";
  //celular desde casa
  //final String URL= "http://192.168.1.20:3000/api";
  //celular desde U
  final String URL= "http://10.20.139.91:3000/api";
  

  Future<RespuestaGenerica> solicitud_get(String recurso) async {
    Map<String, String> header = {'Content-Type': 'application/json'};
    final String url = URL + recurso;
    final uri = Uri.parse(url);
    try {
      final response = await http.get(uri, headers: header);
      if (response.statusCode != 200) {
        if (response.statusCode == 404) {
          return _response(404, "Recurso no encontrado", []);
        } else {
          Map<dynamic, dynamic> mapa = jsonDecode(response.body);
          return _response(mapa['code'], mapa['msg'], mapa['datos']);
        }
      } else {
        Map<dynamic, dynamic> mapa = jsonDecode(response.body);
        return _response(mapa['code'], mapa['msg'], mapa['datos']);
        //log(response.body);
      }
      //return RespuestaGenerica();
    } catch (e) {
      return _response(500, "Error inesperado", []);
    }
  }

  RespuestaGenerica _response(int code, String msg, dynamic data) {
    var respuesta = RespuestaGenerica();
    respuesta.code = code;
    respuesta.datos = data;
    respuesta.msg = msg;
    return respuesta;
  }
}