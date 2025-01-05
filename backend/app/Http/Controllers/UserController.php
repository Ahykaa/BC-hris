<?php


namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function profile(Request $request)
    {
        $user = User::with('department')->find(Auth::id());
        return response()->json([
            'data' => [
                'id' => $user->id,
                'firstName' => $user->firstName,
                'middleName' => $user->middleName,
                'lastName' => $user->lastName,
                'username' => $user->username,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
                'department' => $user->department ? $user->department->name : null,
                'position' => $user->position,
                'employee_id' => $user->employee_id,
                'role' => $user->role,
                'date_started' => $user->date_started,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ]
        ], 200);
    }

    // Method to change the user's password
    public function changePassword(Request $request)
    {
        // Validate input fields
        $validated = $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed', // Ensure the new password matches confirm_password
        ]);

        // Get the currently authenticated user
        $user = Auth::user();

        // Check if the user is authenticated
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        // Check if the provided current password is correct
        if (!Hash::check($validated['current_password'], $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['The provided password is incorrect.'],
            ]);
        }

        // Update the user's password
        $user->password = Hash::make($validated['new_password']);
        
        // Save the updated user model
        if ($user->save()) {
            return response()->json([
                'message' => 'Password updated successfully.',
            ], 200);
        } else {
            return response()->json([
                'error' => 'Failed to update password. Please try again later.',
            ], 500);
        }
    }
}
