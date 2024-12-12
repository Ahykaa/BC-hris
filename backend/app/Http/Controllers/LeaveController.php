<?php

namespace App\Http\Controllers;

use App\Models\Leave;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LeaveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'leavetype' => 'required|string',
            'reasonforleave' => 'nullable|string',
            'numberofdays' => 'required|integer',
            'dateofleavefrom' => 'required|date',
            'dateofleaveto' => 'required|date',
            'others' => 'nullable|string', // Ensure the others field can be null
        ]);

        // Create the leave record
        $leave = new Leave();
        $leave->employee_id = auth()->user()->id; // Assuming you're using auth for employee ID
        $leave->natureOfLeave = $request->leavetype;
        $leave->reason = $request->reasonforleave;
        $leave->numberOfDays = $request->numberofdays;
        $leave->fromDate = $request->dateofleavefrom;
        $leave->toDate = $request->dateofleaveto;
        $leave->status = 'Pending';

        // Save the specific reason for "Others"
        if ($request->leavetype === 'Others' && !empty($request->others)) {
            $leave->others = $request->others; // Save the specific reason in 'others' column
        }

        // Save the leave record to the database
        $leave->save();

        return response()->json($leave, 201); // Return the created leave record
    }

    /**
     * Display all leave requests for the authenticated user.
     */
    public function getEmployeeRequests()
    {
        $userId = auth()->user()->id;

        // Fetch all leave requests for the authenticated employee
        $leaveRequests = Leave::where('employee_id', $userId)->get();

        return response()->json($leaveRequests, 200);
    }

    /**
     * Display all leave requests (for admin view).
     */
    public function getAllRequests()
    {
        // Fetch all leave requests (admin view)
        $leaveRequests = Leave::all();

        return response()->json($leaveRequests, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Leave $leave)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Leave $leave)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Leave $leave)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Leave $leave)
    {
        //
    }
}
