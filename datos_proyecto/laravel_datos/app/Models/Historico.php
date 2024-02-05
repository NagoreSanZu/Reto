<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Historico extends Model
{


    protected $table = 'historicos';

    
    use HasFactory;

    protected $fillable = [
        'id',
        'nombre_ciudad',
        'temperatura',
        'humedad',
        'estadoCielo',
        'visibilidad',
        'visibilidad'
    ];
}
