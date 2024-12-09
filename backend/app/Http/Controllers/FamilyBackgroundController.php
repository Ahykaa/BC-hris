<?php

namespace App\Http\Controllers;

use App\Models\FamilyBackground;
use Illuminate\Http\Request;

class FamilyBackgroundController extends Controller
{
    // Display a listing of the resource
    public function index()
    {
        $familyBackgrounds = FamilyBackground::with('personalInfo')->get();
        return response()->json($familyBackgrounds);
    }

    // Store a newly created resource
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'personal_info_id' => 'required|exists:personal_infos,id',
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

        $familyBackground = FamilyBackground::create($validatedData);
        return response()->json($familyBackground, 201);
    }

    // Display the specified resource
    public function show($id)
    {
        $familyBackground = FamilyBackground::with('personalInfo')->findOrFail($id);
        return response()->json($familyBackground);
    }

    // Update the specified resource
    public function update(Request $request, $id)
    {
        $familyBackground = FamilyBackground::findOrFail($id);
        $validatedData = $request->validate([
            // Same validation rules as store()
        ]);

        $familyBackground->update($validatedData);
        return response()->json($familyBackground);
    }

    // Remove the specified resource
    public function destroy($id)
    {
        $familyBackground = FamilyBackground::findOrFail($id);
        $familyBackground->delete();
        return response()->noContent();
    }
}
