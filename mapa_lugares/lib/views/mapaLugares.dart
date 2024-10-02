import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:geolocator/geolocator.dart';

class MapaLugares extends StatefulWidget {
  final List<dynamic> lugares;
  const MapaLugares({Key? key, required this.lugares}) : super(key: key);

  @override
  _MapaLugaresState createState() => _MapaLugaresState();
}

class _MapaLugaresState extends State<MapaLugares> {
  late Future<Position> posicion;
  double? latitud;
  double? longitud;

  @override
  void initState() {
    super.initState();
    // Inicializamos el Future que obtiene la posición en initState
    posicion = _obtenerPosicion();
  }

  Future<Position> _obtenerPosicion() async {
    return await Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.medium,
    );
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Position>(
      future: posicion,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          // Muestra un indicador de carga mientras se obtiene la posición
          return const Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          // Maneja cualquier error que pueda ocurrir al obtener la posición
          return Text('Error al obtener la posición: ${snapshot.error}');
        } else if (snapshot.hasData) {
          // Guarda la latitud y longitud obtenidas
          latitud = snapshot.data?.latitude;
          longitud = snapshot.data?.longitude;

          // Construye el mapa utilizando la posición obtenida
          return FlutterMap(
            options: MapOptions(
              initialCenter: LatLng(latitud ?? 51.509364, longitud ?? -0.128928),
              initialZoom: 16,
            ),
            children: [
              TileLayer(
                urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                userAgentPackageName: 'Flutter Map',
              ),
              MarkerLayer(
                markers: widget.lugares
                    .map((lugar) => Marker(
                          width: 300.0,
                          height: 300.0,
                          point: LatLng(lugar['latitud'], lugar['longitud']),
                          child: GestureDetector(
                            onTap: () {
                              showDialog(
                                  context: context,
                                  builder: (BuildContext context) {
                                    return AlertDialog(
                                      title: Text(
                                        '${lugar['nombre']}',
                                        style: const TextStyle(
                                            fontWeight: FontWeight.bold),
                                      ),
                                    );
                                  });
                            },
                            child: const Icon(
                              Icons.location_on,
                              color: Colors.red,
                            ),
                          ),
                        ))
                    .toList(),
              ),
            ],
          );
        } else {
          return const Text('No se pudo obtener la posición');
        }
      },
    );
  }
}
