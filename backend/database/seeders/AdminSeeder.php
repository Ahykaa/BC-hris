<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->upsert([
            'firstName'     =>  'Admin',
            'lastName'      =>  'Account',
            'username'      =>  'bcAdmin',
            'email'         =>  'bc_admin@gmail.com',
            'password'      =>  Hash::make('admin123'),
            'dept_id'       =>  2,
            'employee_id'   =>  '123',
            'role'          =>  'admin',
        ], ['username']);

        DB::table('users')->upsert([
            'firstName'     =>  'Super',
            'lastName'      =>  'Admin',
            'username'      =>  'superadmin',
            'email'         =>  'bc_superadmin@gmail.com',
            'password'      =>  Hash::make('admin123'),
            'dept_id'       =>  4,
            'employee_id'   =>  '56789',
            'role'          =>  'superAdmin',
        ], ['username']);

        DB::table('users')->upsert([
            'firstName'     =>  'Admin',
            'lastName'      =>  'Compre',
            'username'      =>  'adminCompre',
            'email'         =>  'bc_adminCompe@gmail.com',
            'password'      =>  Hash::make('admin123'),
            'dept_id'       =>  4,
            'employee_id'   =>  '45978997',
            'role'          =>  'adminCompre',
        ], ['username']);
    }
}
