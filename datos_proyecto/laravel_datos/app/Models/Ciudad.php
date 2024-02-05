<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ciudad extends Model
{
    protected $table = 'ciudades';

    protected $primaryKey = "nombre";

    protected $keyType = "string";
    
    use HasFactory;

    protected $fillable = [
        'nombre',
        'latitud',
        'longitud',
        'temperatura',
        'humedad',
        'estadoCielo',
        'visibilidad',
        'nubes'
    ];

}
