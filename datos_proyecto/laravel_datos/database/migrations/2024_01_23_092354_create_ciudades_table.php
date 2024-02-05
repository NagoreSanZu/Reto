<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ciudades', function (Blueprint $table) {
            $table->string("nombre")->primary();
            $table->string("latitud");
            $table->string("longitud");
            $table->string("temperatura");
            $table->string("humedad");
            $table->string("estadoCielo");
            $table->string("visibilidad");
            $table->string("nubes");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ciudades');
    }
};
