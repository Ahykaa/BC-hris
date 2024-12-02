<?php

namespace Database\Seeders;


use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('departments')->upsert([
            ['id' => 1,     'name' => 'Accounting/CMD'],
            ['id' => 2,     'name' => 'Admin/HRMD'],
            ['id' => 3,     'name' => 'Alumni'],
            ['id' => 4,     'name' => 'ASBM'],
            ['id' => 5,     'name' => 'BED'],
            ['id' => 6,     'name' => 'Chaplaincy'],
            ['id' => 7,     'name' => 'CES/Prado'],
            ['id' => 8,     'name' => 'CPWC'],
            ['id' => 9,     'name' => 'GSD'],
            ['id' => 10,    'name' => 'HAW'],
            ['id' => 11,    'name' => 'LRMC'],
            ['id' => 12,    'name' => 'GAD/NSTP'],
            ['id' => 13,    'name' => 'Marketing'],
            ['id' => 14,    'name' => 'MIS'],
            ['id' => 15,    'name' => 'Nursing'],
            ['id' => 16,    'name' => 'OSA'],
            ['id' => 17,    'name' => 'Presidents Office'],
            ['id' => 18,    'name' => 'RPO'],
            ['id' => 19,    'name' => 'School of Medicine'],
            ['id' => 20,    'name' => 'Student Records'],
            ['id' => 21,    'name' => 'Allied Health'],
            ['id' => 22,    'name' => 'Security Department'],
        ], ['name'], ['created_at', 'updated_at']);
    }
}