import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:validators/validators.dart';

class SessionView extends StatefulWidget {
  const SessionView({ Key? key }) : super(key: key);

  @override
  _SessionViewState createState() => _SessionViewState();
}

class _SessionViewState extends State<SessionView> {
  final _formKey = GlobalKey<FormState>(); //El guión bajo indica que la variable es privada
  final TextEditingController correoControl = TextEditingController();
  final TextEditingController claveControl = TextEditingController();
  void _iniciar(){
    setState(() {
      if(_formKey.currentState!.validate()){
        
          if(correoControl.text == "david@gmail.com" || claveControl.text == "12345"){
            final SnackBar msg = const SnackBar(content: Text('Bienvenido'));
            ScaffoldMessenger.of(context).showSnackBar(msg);
            Navigator.pushNamed(context, '/lugares');
          }else{
            final SnackBar msg = const SnackBar(content: Text('Usuario no existe'));
            ScaffoldMessenger.of(context).showSnackBar(msg);
          }
        
        
      }else{
        log("okn't");
      }
    });
  }
  @override
  Widget build(BuildContext context) {
    return Form(
      key : _formKey,
      child: Scaffold(
        body: ListView(
          padding: const EdgeInsets.all(32),
          children: <Widget>[
            Container(
              alignment: Alignment.center,
              padding: const EdgeInsets.all(10),
              child: const Text("Lugares", 
              style: TextStyle(
                color: Colors.blue,
                fontWeight: FontWeight.bold,
                fontSize :30
              )),
            ),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextFormField(
                controller: correoControl,
                decoration: const InputDecoration(
                  labelText: 'Correo',
                  suffixIcon: Icon(Icons.alternate_email)
                ),
                validator:(value){
                  if(value!.isEmpty){
                    return "Debe ingresar su correo";
                  }
                  if(!isEmail(value)){
                    return "Ingrese un correo válido";
                  }
                  return null;
                },
              ),
            ),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextFormField(
                obscureText: true,
                controller: claveControl,
                decoration: const InputDecoration(
                  labelText: 'Clave',
                  suffixIcon: Icon(Icons.key)
                ),
                validator:(value){
                  if(value!.isEmpty){
                    return "Debe ingresar su clave";
                  }
                  return null;
                },
              ),
            ),
            Container(
              height:50,
              padding: const EdgeInsets.fromLTRB(10,0,10,0), //Función para padding de todos lados Left, Top, Right, Bottom
              child: ElevatedButton(
                child: const Text("Inicio"),
                onPressed: (){
                  _iniciar();
                  
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}