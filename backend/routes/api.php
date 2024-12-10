<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\PersonalInfoController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Leave;
use App\Models\Document;
use App\Models\Department; // Add Department model for fetching departments

/*
|-------------------------------------------------------------------------- 
| API Routes
|-------------------------------------------------------------------------- 
| 
| Here is where you can register API routes for your application. These 
| routes are loaded by the RouteServiceProvider within a group which 
| is assigned the "api" middleware group. Enjoy building your API! 
|
*/

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', [AuthController::class, 'user']);

    // Resource routes for Leave and Profile
    Route::resource('leave', LeaveController::class);
    Route::resource('profile', PersonalInfoController::class);

    // Route for storing documents
    Route::post('/documents', [DocumentController::class, 'store']);

    // Route to get all requests (leave & document) for an authenticated employee
    Route::get('/employee/requests', function () {
        $userId = auth()->user()->id;

        // Fetch the leave and document requests for the authenticated employee
        $leaveRequests = Leave::where('employee_id', $userId)->get();
        $documentRequests = Document::where('employee_id', $userId)->get();

        // Return the leave and document data as JSON
        return response()->json([
            'leaves' => $leaveRequests,
            'documents' => $documentRequests,
        ]);
    });

    //Get employee
    Route::get('/employees', [EmployeeController::class, 'index']);

    // Route for registration
    Route::post('/register', [RegistrationController::class, 'store']);

    // Route to fetch departments (for dropdown in frontend)
    Route::get('/departments', function () {
        return response()->json(Department::all());  // Get all departments
    });
});
