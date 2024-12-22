<?php

// app/Http/Controllers/UserController.php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
}
