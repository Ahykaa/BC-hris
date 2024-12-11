<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('family_backgrounds', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('personal_info_id')->nullable(); // Nullable by default
            $table->string('father_name')->nullable();
            $table->string('father_occupation')->nullable();
            $table->string('father_contact_number')->nullable();
            $table->date('father_date_of_birth')->nullable();

            $table->string('mother_name')->nullable();
            $table->string('mother_occupation')->nullable();
            $table->string('mother_contact_number')->nullable();
            $table->date('mother_date_of_birth')->nullable();

            $table->string('spouse_name')->nullable();
            $table->string('spouse_occupation')->nullable();
            $table->string('spouse_contact_number')->nullable();
            $table->date('spouse_date_of_birth')->nullable();

            $table->string('emergency_contact_name');
            $table->string('emergency_contact_address');
            $table->string('emergency_contact_number');
            $table->string('emergency_contact_relationship');

            $table->timestamps();

            // Foreign key constraint
            $table->foreign('personal_info_id')->references('id')->on('personal_infos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('family_backgrounds');
    }
};
