<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Removed the 'unique:users' validation rule
        $request->validate([
            'username' => 'required|string',  // No need for 'unique' validation here
            'password' => 'required|string',
        ]);

        // Find the user by the username
        $user = User::where('username', $request->username)->first();

        // If the user doesn't exist or the password is incorrect
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'username' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Generate a personal access token
        $token = $user->createToken('Personal Access Token')->plainTextToken;

        // Return the token in the response
        return response()->json(['token' => $token]);
    }

    public function logout(Request $request)
    {
        $user = Auth::user();

        if ($user) {
            $user->tokens->each(function ($token) {
                $token->delete();
            });

            return response()->json(['message' => 'Logged out successfully.']);
        }

        return response()->json(['message' => 'User not found.'], 404);
    }

    public function user(Request $request)
    {
        $user = Auth::user();

        if ($user) {
            return response()->json([
                'id' => $user->id,
                'firstName' => $user->firstName,
                'lastName' => $user->lastName,
                'email' => $user->email,
                'role' => $user->role,
            ]);
        }

        return response()->json(['message' => 'User not found.'], 404);
    }
}
