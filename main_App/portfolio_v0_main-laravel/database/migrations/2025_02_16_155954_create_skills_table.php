<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSkillsTable extends Migration
{
    public function up()
    {
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('category'); // e.g., Front-end, Back-end, Mobile, etc.
            $table->text('skills'); // e.g., "HTML, CSS, JavaScript, React Js, Tailwind CSS, Bootstrap, AJAX"
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('skills');
    }
}
