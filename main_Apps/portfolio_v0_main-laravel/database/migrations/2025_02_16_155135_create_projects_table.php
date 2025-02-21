<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Project title
            $table->text('description')->nullable();
            $table->text('backend')->nullable();
            $table->text('frontend')->nullable();
            $table->text('tools')->nullable();
            $table->string('link')->nullable(); // Optional external link
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
