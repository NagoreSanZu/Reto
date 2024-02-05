<?php

namespace App\Http\Controllers;

use App\Models\Ciudad;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class CiudadesController extends Controller
{
   function traer_datos()
   {
      $coordenasCiudades = Ciudad::all("nombre", "latitud", "longitud");
      $respuesta = [];
      foreach ($coordenasCiudades as $coordenadas) {
         $apiCall = "https://api.openweathermap.org/data/2.5/onecall?lang=es&lat=" . $coordenadas["latitud"] . "&lon=" . $coordenadas["longitud"] . "&units=metric&appid=ee7c4b79648c7ec65f4c16b0b11a0ffe";

         log::info($apiCall);

         $response = json_decode(@file_get_contents($apiCall), true);

         // Recuperar la ciudad basandote en las coordenadas
         $ciudad = Ciudad::find($coordenadas["nombre"]);

         // Actualizar la ciudad teniendo en cuenta los datos que te devuelve
         if ($ciudad) {
            $ciudad->update([
               //campo a actualizar => dato
               "temperatura" => $response["current"]["temp"],
               "humedad" => $response["current"]["humidity"],
               "estadoCielo" => $response["current"]["weather"][0]["description"],
               "visibilidad" => $response["current"]["visibility"],
               "nubes" => $response["current"]["clouds"],

            ]);
         }
      }

   } //fin funcion trar datos

   function datos_random()
   {
      // coger el valor de la temperatura
      // j: utilizar el modelo de ciudad para recoger la temperatura de la bbdd
      $temperaturas = Ciudad::all();

      //hacerun forech
      foreach ($temperaturas as $temperatura) {
         /*
            Sumarle a temperatura un valor aleatorio entre -1 y 1

            Actualizar la temperatura con el nuevo valor
         */
         $nuevaTemperatura = ($temperatura["temperatura"] + rand(100, -100) / 100);

         log::info($temperatura);
         log::info($nuevaTemperatura);
         $temperatura->update([
            "temperatura" => $nuevaTemperatura,
         ]);
      }
      
      log::info("####");

   }

   
} //fin clase
