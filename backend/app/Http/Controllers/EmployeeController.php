<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Leave;
use App\Models\User;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        // Fetch all users with the necessary data
        $employees = User::select('employee_id', 'lastName', 'firstName', 'position_id', 'dept_id', 'date_started', 'role')
            ->with('department:name,id') // Assuming a Department model
            ->get();

        return response()->json($employees);
    }

    public function getRequests()
    {
        // Get the authenticated user's employee_id (since we're using employee_id)
        $employeeId = auth()->user()->employee_id;

        // Fetch the leave and document requests for the authenticated employee
        $leaveRequests = Leave::where('employee_id', $employeeId)->get();
        $documentRequests = Document::where('employee_id', $employeeId)->get();

        // Return the leave and document data as JSON
        return response()->json([
            'leaves' => $leaveRequests,
            'documents' => $documentRequests,
        ]);
    }

    public function getAllRequestsForSuperAdmin()
    {
        try {
            // Fetch all leaves
            $leaves = Leave::all();

            // Fetch all documents
            $documents = Document::all();

            // Return combined data
            return response()->json([
                'leaves' => $leaves,
                'documents' => $documents,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch all requests',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

}
