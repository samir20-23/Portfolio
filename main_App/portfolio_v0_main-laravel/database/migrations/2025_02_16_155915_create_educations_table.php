<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEducationsTable extends Migration
{
    public function up()
    {
        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // e.g. Centre Solidaire Digital - Solicode - Tanger
            $table->string('institution')->nullable();
            $table->text('description')->nullable();
            $table->year('year')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('educations');
    }
}
