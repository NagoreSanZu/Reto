<?php

namespace App\Http\Controllers;

use App\Models\Ciudad;
use App\Models\Historico;
use Illuminate\Http\Request;

class HistoricoController extends Controller
{

    public function almacenar_datos()
    {
        // recoger datos actuales
        // ¿Donde estan? : en la BBDD
        // ¿como los cojemos de la base de datos? : $ciudades = Ciudad::all()

        $ciudades = Ciudad::all();

        // rellenar modelo historico
        foreach ($ciudades as $ciudad) {

            $historico = new Historico();

            $historico["nombre_ciudad"]=$ciudad["nombre"];
            $historico["temperatura"]=$ciudad["temperatura"];
            $historico["humedad"]=$ciudad["humedad"];
            $historico["estadoCielo"]=$ciudad["estadoCielo"];
            $historico["visibilidad"]=$ciudad["visibilidad"];
            $historico["nubes"]=$ciudad["nubes"];

            $historico->save();
        }

        // almacenar historico
    }
}
