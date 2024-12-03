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
        Schema::create('personal_infos', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('employee_id')->unique();
            $table->string('prefix')->nullable();
            $table->string('firstName');
            $table->string('lastName');
            $table->string('middleName')->nullable();
            $table->string('nickName')->nullable();
            $table->enum('gender', ['Male', 'Female']);
            $table->string('religion')->nullable();
            $table->enum('civilStatus', ['Single', 'Married', 'Widowed', 'Separated', 'Divorced']);
            $table->string('citizenship');
            $table->date('birthday');
            $table->string('placeOfBirth');
            $table->string('email')->unique();
            $table->unsignedBigInteger('dept_id');
            $table->string('position');
            $table->enum('type', ['Present', 'Permanent', 'Provincial'])->nullable();
            $table->string('houseNumber')->nullable();
            $table->string('barangay');
            $table->string('city');
            $table->string('province');
            $table->string('zip');
            $table->string('philHealth_no');
            $table->string('pagibig_no');
            $table->string('tin');
            $table->string('sss_no');
            $table->string('prc_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('personal_infos');
    }
};
