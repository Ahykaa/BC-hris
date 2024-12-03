<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->foreignId('employee_id')->constrained('users')->onDelete('cascade');
            $table->string('firstName');
            $table->string('middleName')->nullable();
            $table->string('lastName');
            $table->string('requestedDocuments');
            $table->string('purpose');
            $table->string('orNumber')->nullable();
            $table->integer('numCopies');
            $table->string('otherDocument')->nullable();
            $table->date('dateOfRequest');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamps(); // Created_at and Updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
