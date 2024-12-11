<?php

namespace App\Http\Controllers;

use App\Models\FamilyBackground;
use Illuminate\Http\Request;

class FamilyBackgroundController extends Controller
{
    // Display a listing of the resource
    public function index()
    {
        // Fetch all family backgrounds with their associated personal info if available
        $familyBackgrounds = FamilyBackground::with('personalInfo')->get();
        return response()->json($familyBackgrounds);
    }

    // Store a newly created resource
    public function store(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'personal_info_id' => 'nullable|exists:profieInfo,id',
            'father_name' => 'nullable|string|max:255',
            'father_occupation' => 'nullable|string|max:255',
            'father_contact_number' => 'nullable|string|max:20',
            'father_date_of_birth' => 'nullable|date',
            'mother_name' => 'nullable|string|max:255',
            'mother_occupation' => 'nullable|string|max:255',
            'mother_contact_number' => 'nullable|string|max:20',
            'mother_date_of_birth' => 'nullable|date',
            'spouse_name' => 'nullable|string|max:255',
            'spouse_occupation' => 'nullable|string|max:255',
            'spouse_contact_number' => 'nullable|string|max:20',
            'spouse_date_of_birth' => 'nullable|date',
            'emergency_contact_name' => 'required|string|max:255',
            'emergency_contact_address' => 'required|string|max:255',
            'emergency_contact_number' => 'required|string|max:20',
            'emergency_contact_relationship' => 'required|string|max:50',
        ]);

        // Create a new FamilyBackground record
        $familyBackground = FamilyBackground::create($validatedData);

        // Return the created resource
        return response()->json($familyBackground, 201);
    }

    // Display the specified resource
    public function show($id)
    {
        // Fetch a specific family background with its associated personal info
        $familyBackground = FamilyBackground::with('personalInfo')->findOrFail($id);
        return response()->json($familyBackground);
    }

    // Update the specified resource
    public function update(Request $request, $id)
    {
        // Find the record to update
        $familyBackground = FamilyBackground::findOrFail($id);

        // Validate incoming request data
        $validatedData = $request->validate([
            'personal_info_id' => 'nullable|exists:personal_infos,id',
            'father_name' => 'nullable|string|max:255',
            'father_occupation' => 'nullable|string|max:255',
            'father_contact_number' => 'nullable|string|max:20',
            'father_date_of_birth' => 'nullable|date',
            'mother_name' => 'nullable|string|max:255',
            'mother_occupation' => 'nullable|string|max:255',
            'mother_contact_number' => 'nullable|string|max:20',
            'mother_date_of_birth' => 'nullable|date',
            'spouse_name' => 'nullable|string|max:255',
            'spouse_occupation' => 'nullable|string|max:255',
            'spouse_contact_number' => 'nullable|string|max:20',
            'spouse_date_of_birth' => 'nullable|date',
            'emergency_contact_name' => 'required|string|max:255',
            'emergency_contact_address' => 'required|string|max:255',
            'emergency_contact_number' => 'required|string|max:20',
            'emergency_contact_relationship' => 'required|string|max:50',
        ]);

        // Update the record with validated data
        $familyBackground->update($validatedData);

        // Return the updated resource
        return response()->json($familyBackground);
    }

    // Remove the specified resource
    public function destroy($id)
    {
        // Find the record to delete
        $familyBackground = FamilyBackground::findOrFail($id);

        // Delete the record
        $familyBackground->delete();

        // Return a no-content response
        return response()->noContent();
    }
}
