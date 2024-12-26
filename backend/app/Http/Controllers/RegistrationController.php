<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegistrationController extends Controller
{
    /**
     * Store a newly registered user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Define valid roles
        $validRoles = ['employee', 'admin', 'adminCompre', 'superAdmin'];

        // Validate incoming data
        $validatedData = $request->validate([
            'employee_id' => 'required|integer|unique:users', // Ensure employee_id is unique
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'middleName' => 'nullable|string|max:255',
            'date_started' => 'required|date',
            'dept_id' => 'required|integer', // Ensure dept_id is an integer
            'position_id' => 'required|integer',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'nullable|email|unique:users', // Ensure email is unique, nullable
            'password' => 'required|string|min:6', // Confirm password field
            'role' => 'required|in:' . implode(',', $validRoles), // Validate role is one of the valid roles
        ]);

        // Create and store the user data in the 'users' table
        $user = new User();
        $user->employee_id = $validatedData['employee_id'];
        $user->firstName = $validatedData['firstName'];
        $user->lastName = $validatedData['lastName'];
        $user->middleName = $validatedData['middleName'];
        $user->date_started = $validatedData['date_started'];
        $user->dept_id = $validatedData['dept_id'];
        $user->position_id = $validatedData['position_id'];
        $user->username = $validatedData['username'];

        // Check if email is provided before assigning it
        $user->email = $validatedData['email'] ?? null;  // If email is not provided, it will be null

        $user->password = Hash::make($validatedData['password']); // Encrypt password before saving
        $user->role = $validatedData['role']; // Set the role from the request data
        $user->save();

        // Return a response with the user data
        return response()->json(['message' => 'Registration successful', 'data' => $user], 201);
    }
}

