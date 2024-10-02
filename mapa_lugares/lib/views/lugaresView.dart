import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:mapa_lugares/conexion/Solicitud.dart';
import 'package:mapa_lugares/views/mapaLugares.dart';

class LugaresView extends StatefulWidget {
  const LugaresView({ Key? key }) : super(key: key);

  @override
  _LugaresViewState createState() => _LugaresViewState();
}

class _LugaresViewState extends State<LugaresView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Lugares')),
      body: ListView(
        padding: const EdgeInsets.all(32),
        children: const <Widget>[
          CheckboxListTileExample(),
        ],
      ),
    );
  }
}

class CheckboxListTileExample extends StatefulWidget {
  const CheckboxListTileExample({super.key});

  @override
  State<CheckboxListTileExample> createState() =>
      _CheckboxListTileExampleState();
}


class _CheckboxListTileExampleState extends State<CheckboxListTileExample> {
  bool checkboxValue1 = false;
  bool checkboxValue2 = false;
  bool checkboxValue3 = false;
  bool checkboxValue4 = false;
  bool checkboxValue5 = false;
  String selectedLugar = ''; // Aquí se almacenará el texto del checkbox seleccionado

  Solicitud solicitud = Solicitud();
  List<dynamic> lugares = [];

  // Método para actualizar la selección
  void _updateSelection(String lugarSeleccionado) {
    setState(() {
      selectedLugar = lugarSeleccionado; // Actualiza con el texto del checkbox seleccionado
    });
  }

  void _obtenerLugares(){
    try{
      solicitud.listarLugaresPorTipo(selectedLugar).then((value) {
        setState(() {
          lugares = value.datos;
          Navigator.push(context, 
          MaterialPageRoute(
            builder: (context) => 
            MapaLugares(lugares: lugares)));
        });
      });
    }catch(error){
      log(error.toString());
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        CheckboxListTile(
          value: checkboxValue1,
          onChanged: (bool? value) {
            setState(() {
              checkboxValue1 = value!;
              checkboxValue2 = checkboxValue3 = checkboxValue4 = checkboxValue5 = false; // Desmarca los otros
              _updateSelection('Parque'); // Actualiza la selección
            });
          },
          title: const Text('Parque'),
        ),
        const Divider(height: 0),
        CheckboxListTile(
          value: checkboxValue2,
          onChanged: (bool? value) {
            setState(() {
              checkboxValue2 = value!;
              checkboxValue1 = checkboxValue3 = checkboxValue4 = checkboxValue5 = false; // Desmarca los otros
              _updateSelection('Clinica'); // Actualiza la selección
            });
          },
          title: const Text('Clinica'),
        ),
        const Divider(height: 0),
        CheckboxListTile(
          value: checkboxValue3,
          onChanged: (bool? value) {
            setState(() {
              checkboxValue3 = value!;
              checkboxValue1 = checkboxValue2 = checkboxValue4 = checkboxValue5 = false; // Desmarca los otros
              _updateSelection('Supermercado'); // Actualiza la selección
            });
          },
          title: const Text('Supermercado'),
        ),
        const Divider(height: 0),
        CheckboxListTile(
          value: checkboxValue4,
          onChanged: (bool? value) {
            setState(() {
              checkboxValue4 = value!;
              checkboxValue1 = checkboxValue2 = checkboxValue3 = checkboxValue5 = false; // Desmarca los otros
              _updateSelection('Universidad'); // Actualiza la selección
            });
          },
          title: const Text('Universidad'),
        ),
        const Divider(height: 0),
        CheckboxListTile(
          value: checkboxValue5,
          onChanged: (bool? value) {
            setState(() {
              checkboxValue5 = value!;
              checkboxValue1 = checkboxValue2 = checkboxValue3 = checkboxValue4 = false; // Desmarca los otros
              _updateSelection('Restaurante'); // Actualiza la selección
            });
          },
          title: const Text('Restaurante'),
        ),
        const Divider(height: 0),

        // Botón para realizar la búsqueda con el lugar seleccionado
        Container(
          height: 50,
          padding: const EdgeInsets.fromLTRB(10, 0, 10, 0), 
          child: ElevatedButton(
            child: const Text("Buscar"),
            onPressed: () {
              _obtenerLugares();
            },
          ),
        ),
      ],
    );
  }
}
