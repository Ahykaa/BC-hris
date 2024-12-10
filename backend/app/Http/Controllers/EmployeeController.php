<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        // Fetch all users with the necessary data
        $employees = User::select('employee_id', 'lastName', 'firstName', 'position', 'dept_id', 'date_started')
            ->with('department:name,id') // Assuming a Department model
            ->get();

        return response()->json($employees);
    }
}
