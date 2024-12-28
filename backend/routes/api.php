<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\PersonalInfoController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\UserController;
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
    Route::get('/employee/requests', [EmployeeController::class, 'getRequests']);

    // get all document request
    Route::get('/documents/all', [DocumentController::class, 'getAllRequests']);

    //Get employee list for admin dashboard
    // Route to get all leave requests for admin
    Route::get('/admin/requests', [LeaveController::class, 'getAllRequests']);

    // Get employee
    Route::get('/employees', [EmployeeController::class, 'index']);

    // Get the logged-in user's profile
    Route::get('/user/profile', [UserController::class, 'profile']);

    // Route for registration
    Route::post('/register', [RegistrationController::class, 'store']);

    // Route to fetch departments (for dropdown in frontend)
    Route::get('/departments', function () {
        return response()->json(Department::all());  // Get all departments
    });

    // Get all document request for admin
    Route::get('/documents/all', [DocumentController::class, 'getAllRequests']);

    // Get position by department_id
    Route::get('/positionsbyDepartment', [PositionController::class, 'getPositionsByDepartment']);

    Route::get('/positions', [PositionController::class, 'index']);

    // Route get all requests (leave & document) for super admin
    Route::get('/superAdmin/requests', [EmployeeController::class, 'getAllRequestsForSuperAdmin']);

});
