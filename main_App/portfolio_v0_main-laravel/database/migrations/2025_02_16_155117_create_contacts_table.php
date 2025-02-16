<?php 

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactsTable extends Migration
{
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('position')->nullable(); // e.g. Full-Stack Developer
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('location')->nullable();
            $table->text('languages')->nullable(); // e.g. "Arabe (Maternelle), Anglais (Notion De Base), Francais (Niveau Scolaire)"
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('contacts');
    }
}
