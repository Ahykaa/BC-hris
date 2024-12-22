<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('positions')->upsert([
            // Top Administrators
            ['name' => 'College President', 'department_id' => 17],
            ['name' => 'Director for Academics and Student Services', 'department_id' => 17],
            ['name' => 'VPAASS', 'department_id' => 17],
            ['name' => 'Director for Finance', 'department_id' => 1],
            ['name' => 'HRMD Director', 'department_id' => 2],

            // Middle Administrators
            ['name' => 'Dean in the School of Nursing', 'department_id' => 15],
            ['name' => 'Dean, ASBM', 'department_id' => 4],
            ['name' => 'Dean of Allied Health/Program Head, MLS', 'department_id' => 21],
            ['name' => 'Dean, School of Medicine', 'department_id' => 19],
            ['name' => 'Unit Head, RPO', 'department_id' => 18],
            ['name' => 'Dean, Graduate Studies', 'department_id' => 4],
            ['name' => 'OIC-Prinical for Basic Education', 'department_id' => 5],

            // Unit Heads
            ['name' => 'College Chaplain', 'department_id' => 6],
            ['name' => 'OIC-Unit Head, CPWC', 'department_id' => 8],
            ['name' => 'Head, Cash Management', 'department_id' => 1],
            ['name' => 'OIC-Head, Laboratory', 'department_id' => 9],
            ['name' => 'OIC-Unit Head, GSD', 'department_id' => 9],
            ['name' => 'Manager, Assessment Center / OIC Program Chairperson, Hospitality Management', 'department_id' => 4],
            ['name' => 'OIC-Unit Head, Accounting', 'department_id' => 1],
            ['name' => 'Head, Business Compliance', 'department_id' => 4],
            ['name' => 'Head, Properties, Resources & Assets Development Office', 'department_id' => 4],
            ['name' => 'Unit Head, Student Development Services', 'department_id' => 16],
            ['name' => 'Unit Head, LRMC', 'department_id' => 11],
            ['name' => 'Unit Head, Safety and Security', 'department_id' => 22],
            ['name' => 'Head, Student Records', 'department_id' => 20],
            ['name' => 'Unit Head, CES', 'department_id' => 7],
            ['name' => 'Unit Head, Management Information System', 'department_id' => 14],

            // Program Chairperson
            ['name' => 'BS Psychology', 'department_id' => 15],
            ['name' => 'Business Administration', 'department_id' => 4],
            ['name' => 'Theology', 'department_id' => 6],
            ['name' => 'OIC- Pharmacy / Pharmacy Intern Coordinator', 'department_id' => 21],
            ['name' => 'Information Science', 'department_id' => 14],

            // Coordinators
            ['name' => 'Alumni and External Affairs Coordinator (Ongoing)', 'department_id' => 3],
            ['name' => 'Academic Coordinator for MLS', 'department_id' => 21],
            ['name' => 'CDC / JHS Coordinator', 'department_id' => 5],
            ['name' => 'Athletics Coordinator', 'department_id' => 4],
            ['name' => 'General Education Coordinator', 'department_id' => 4],
            ['name' => 'SHS Coordinator', 'department_id' => 5],
            ['name' => 'Related Learning Experience Coordinator', 'department_id' => 14],
            ['name' => 'GAD and NSTP Coordinator', 'department_id' => 12],
            ['name' => 'MLS Clinical Coordinator', 'department_id' => 21],
            ['name' => 'Academic Coordinator', 'department_id' => 14],
            ['name' => 'Nursing Academic coordinator', 'department_id' => 15],
            ['name' => 'Coordinator for OSA-BED', 'department_id' => 5],
            ['name' => 'Data Privacy Officer, Operational Quality Assurance in-charge', 'department_id' => 14],
            ['name' => 'Accreditation Coordinator', 'department_id' => 13],
            ['name' => 'Alumni And External Affairs Coordinator (Incoming)', 'department_id' => 3],
            ['name' => 'PRIL', 'department_id' => 13],
            ['name' => 'Marketing Coordinator', 'department_id' => 13],

            // Academic / Non-teaching staff
            ['name' => 'High School Librarian', 'department_id' => 5],
            ['name' => 'Medical Librarian', 'department_id' => 19],
            ['name' => 'CDC Librarian', 'department_id' => 5],
            ['name' => 'Guidance Associate for CDC', 'department_id' => 5],
            ['name' => 'Guidance Associate for SHS', 'department_id' => 5],
            ['name' => 'Circulation Librarian', 'department_id' => 5],
            ['name' => 'Substitute High School Librarian', 'department_id' => 5],
            ['name' => 'College Librarian', 'department_id' => 5],
            ['name' => 'Psychometrician', 'department_id' => 4],

            // Teaching Personnel
            ['name' => 'Nursing Faculty', 'department_id' => 15],
            ['name' => 'MLS Faculty', 'department_id' => 21],
            ['name' => 'Pharmacy Faculty', 'department_id' => 21],
            ['name' => 'ASBME Faculty', 'department_id' => 4],
            ['name' => 'High School Faculty', 'department_id' => 5],
            ['name' => 'Medicine Faculty', 'department_id' => 19],

            // Non-Teaching Personnel
            ['name' => 'Executive Secretary of the President', 'department_id' => 17],
            ['name' => 'Administrative Assistant to the DASS', 'department_id' => 17],
            ['name' => 'Secretary to the Dean of Allied Health', 'department_id' => 21],
            ['name' => 'Laboratory Technician', 'department_id' => 21],
            ['name' => 'Secretary of the Dean of ASBM', 'department_id' => 4],
            ['name' => 'PE & Athletics', 'department_id' => 4],
            ['name' => 'Prefect of Discipline', 'department_id' => 5],
            ['name' => 'Staff, Basic Education', 'department_id' => 5],
            ['name' => 'School Nurse', 'department_id' => 5],
            ['name' => 'Teller', 'department_id' => 1],
            ['name' => 'Assessment Clerk', 'department_id' => 1],
            ['name' => 'Accounts Receivables', 'department_id' => 1],
            ['name' => 'Disbursement Clerk', 'department_id' => 1],
            ['name' => 'Bookkeeper', 'department_id' => 1],
            ['name' => 'Payroll in-charge', 'department_id' => 2],
            ['name' => 'Compensation & Benefits Staff', 'department_id' => 2],
            ['name' => 'Recruitment and Selection Staff', 'department_id' => 2],
            ['name' => 'GSD Staff', 'department_id' => 9],
            ['name' => 'Library Aide', 'department_id' => 5],
            ['name' => 'Liaison', 'department_id' => 9],
            ['name' => 'Registrar Staff', 'department_id' => 20],
            ['name' => 'Focal Person for Foreign students', 'department_id' => 20],
            ['name' => 'Liaison Officer', 'department_id' => 20],
            ['name' => 'SAP Staff', 'department_id' => 14],
            ['name' => 'Assistant Secretary to the Dean of Nursing', 'department_id' => 15],
            ['name' => 'CSR In-charge', 'department_id' => 15],
            ['name' => 'Secretary to the Dean of Nursing', 'department_id' => 15],
            ['name' => 'Software Support Staff', 'department_id' => 14],
            ['name' => 'MIS Staff', 'department_id' => 14],
            ['name' => 'MIS Technical Staff assistance', 'department_id' => 14],
            ['name' => 'Secretary, School of Medicine', 'department_id' => 19],
            ['name' => 'Consultant, Biology Laboratory', 'department_id' => 19],
            ['name' => 'Anatomy Laboratory Technician', 'department_id' => 19],
            ['name' => 'Secretary to the Associate Dean of Medicine', 'department_id' => 19],
            ['name' => 'Secretary in the School of Medicine', 'department_id' => 19],
            ['name' => 'Security Officer', 'department_id' => 22],
            ['name' => 'Research and Publication Staff', 'department_id' => 4],
            ['name' => 'Property Custodian', 'department_id' => 9],
            ['name' => 'Electrician', 'department_id' => 9],
            ['name' => 'General Support Service Staff', 'department_id' => 9],
            ['name' => 'Company Driver', 'department_id' => 9],
            ['name' => 'Riso & Sound System Operator', 'department_id' => 9],
            ['name' => 'Plumber', 'department_id' => 9],
            ['name' => 'Purchaser', 'department_id' => 9],
            ['name' => 'School Maintenance', 'department_id' => 9],
        ], ['name', 'department_id'], ['created_at', 'updated_at']);
    }
}
