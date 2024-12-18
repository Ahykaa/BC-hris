<?php

// app/Http/Controllers/UserController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    // Fetch the logged-in user's profile
    public function profile(Request $request)
    {
        $user = Auth::user(); // Get the logged-in user
        return response()->json(['data' => $user], 200);
    }
}
