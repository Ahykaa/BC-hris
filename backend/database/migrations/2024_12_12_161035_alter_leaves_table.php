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
        Schema::table('leaves', function (Blueprint $table) {
            // Drop the existing foreign key constraint if it exists
            $table->dropForeign(['employee_id']); 

            // Ensure the 'employee_id' column exists (it should already exist, so we don't need to add it)
            // Recreate the foreign key constraint with the 'employee_id' column referencing 'employee_id' in 'users' table
            $table->foreign('employee_id')
                ->references('employee_id')  // Reference to the 'employee_id' column in the 'users' table
                ->on('users')
                ->onDelete('cascade');  // Cascade delete behavior
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('leaves', function (Blueprint $table) {
            // Drop the foreign key before modifying the column
            $table->dropForeign(['employee_id']);

            // Recreate the foreign key referencing 'users.id' (for rollback purposes)
            $table->foreign('employee_id')
                ->references('id')  // Reference to the 'id' column in the 'users' table
                ->on('users')
                ->onDelete('cascade');
        });
    }
};
