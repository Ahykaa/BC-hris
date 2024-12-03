<?php

namespace App\Http\Controllers;

use App\Models\PersonalInfo;
use Illuminate\Http\Request;

class PersonalInfoController extends Controller
{
    /**
     * Display a listing of the personal infos.
     */
    public function index()
    {
        $personalInfos = PersonalInfo::all();
        return response()->json($personalInfos, 200);
    }

    /**
     * Store a newly created personal info in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|integer|unique:personal_infos,employee_id',
            'prefix' => 'nullable|string',
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'middleName' => 'nullable|string|max:255',
            'nickName' => 'nullable|string|max:255',
            'gender' => 'required|in:Male,Female',
            'religion' => 'nullable|string|max:255',
            'civilStatus' => 'required|in:Single,Married,Widowed,Separated,Divorced',
            'citizenship' => 'required|string|max:255',
            'birthday' => 'required|date',
            'placeOfBirth' => 'required|string|max:255',
            'email' => 'required|email|unique:personal_infos,email',
            'dept_id' => 'required|integer',
            'position' => 'required|string|max:255',
            'houseNumber' => 'nullable|string|max:255',
            'barangay' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'zip' => 'required|string|max:20',
            'philHealth_no' => 'required|string|max:50',
            'pagibig_no' => 'required|string|max:50',
            'tin' => 'required|string|max:50',
            'sss_no' => 'required|string|max:50',
            'prc_id' => 'nullable|string|max:50',
        ]);

        $personalInfo = PersonalInfo::create($validated);

        return response()->json(['message' => 'Personal information created successfully', 'personalInfo' => $personalInfo], 201);
    }

    /**
     * Display the specified personal info.
     */
    public function show($id)
    {
        $personalInfo = PersonalInfo::find($id);

        if (!$personalInfo) {
            return response()->json(['message' => 'Personal info not found'], 404);
        }

        return response()->json($personalInfo, 200);
    }

    /**
     * Update the specified personal info in storage.
     */
    public function update(Request $request, $id)
    {
        $personalInfo = PersonalInfo::find($id);

        if (!$personalInfo) {
            return response()->json(['message' => 'Personal info not found'], 404);
        }

        $validated = $request->validate([
            'employee_id' => 'nullable|integer|unique:personal_infos,employee_id,' . $id,
            'prefix' => 'nullable|string',
            'firstName' => 'nullable|string|max:255',
            'lastName' => 'nullable|string|max:255',
            'middleName' => 'nullable|string|max:255',
            'nickName' => 'nullable|string|max:255',
            'gender' => 'nullable|in:Male,Female',
            'religion' => 'nullable|string|max:255',
            'civilStatus' => 'nullable|in:Single,Married,Widowed,Separated,Divorced',
            'citizenship' => 'nullable|string|max:255',
            'birthday' => 'nullable|date',
            'placeofbirth' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:personal_infos,email,' . $id,
            'dept_id' => 'nullable|integer',
            'position' => 'nullable|string|max:255',
            'type' => 'nullable|in:Present,Permanent,Provincial',
            'houseNumber' => 'nullable|string|max:255',
            'street' => 'nullable|string|max:255',
            'barangay' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'province' => 'nullable|string|max:255',
            'zip' => 'nullable|string|max:20',
            'philHealth_no' => 'nullable|string|max:50',
            'pagibig_no' => 'nullable|string|max:50',
            'tin' => 'nullable|string|max:50',
            'sss_no' => 'nullable|string|max:50',
            'prc_id' => 'nullable|string|max:50',
        ]);

        $personalInfo->update($validated);

        return response()->json(['message' => 'Personal information updated successfully', 'personalInfo' => $personalInfo], 200);
    }

    /**
     * Remove the specified personal info from storage.
     */
    public function destroy($id)
    {
        $personalInfo = PersonalInfo::find($id);

        if (!$personalInfo) {
            return response()->json(['message' => 'Personal info not found'], 404);
        }

        $personalInfo->delete();

        return response()->json(['message' => 'Personal information deleted successfully'], 200);
    }
}
