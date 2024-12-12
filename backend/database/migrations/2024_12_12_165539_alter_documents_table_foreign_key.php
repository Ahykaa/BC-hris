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
        // Drop the existing foreign key constraint
        Schema::table('documents', function (Blueprint $table) {
            $table->dropForeign(['employee_id']);  // Drop the foreign key on employee_id
        });

        // Add the new foreign key referencing users.employee_id
        Schema::table('documents', function (Blueprint $table) {
            $table->foreign('employee_id')
                  ->references('employee_id')  // Reference to employee_id in the users table
                  ->on('users')
                  ->onDelete('cascade');  // Cascade delete behavior
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        // Drop the foreign key in the down migration
        Schema::table('documents', function (Blueprint $table) {
            $table->dropForeign(['employee_id']);
        });

        // Re-add the original foreign key referencing users.id (to undo the changes)
        Schema::table('documents', function (Blueprint $table) {
            $table->foreign('employee_id')
                  ->references('id')  // Reference to id in the users table
                  ->on('users')
                  ->onDelete('cascade');
        });
    }
};
