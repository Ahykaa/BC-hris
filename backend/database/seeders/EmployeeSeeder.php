<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->upsert([
            'firstName'     =>  'Employee',
            'lastName'      =>  'Account',
            'username'      =>  'bcEmployee',
            'email'         =>  'bc_employee@gmail.com',
            'password'      =>  Hash::make('employee123'),
            'dept_id'       =>  2,
            'employee_id'   =>  '321',
            'role'          =>  'employee',
        ], ['username']);
    }
}