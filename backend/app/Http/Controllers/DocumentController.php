<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DocumentController extends Controller
{
    /**
     * Store a newly created document request in storage.
     */
    public function store(Request $request)
    {
        // Validate incoming data (no need for firstName and lastName)
        $validated = $request->validate([
            'requestedDocuments' => 'required|string',
            'purpose' => 'required|string',
            'orNumber' => 'nullable|string',
            'numCopies' => 'required|integer|min:1',
            'otherDocument' => 'nullable|string',
            'dateOfRequest' => 'required|date',
        ]);

        // Get the authenticated user's first and last name
        $user = auth()->user();

        // Create the document record
        $document = new Document();
        $document->employee_id = $user->employee_id;
        $document->firstName = $user->firstName; // Assuming 'firstName' is stored in the 'users' table
        $document->middleName = $user->middleName; // If middle name exists
        $document->lastName = $user->lastName; // Assuming 'lastName' is stored in the 'users' table
        $document->requestedDocuments = $validated['requestedDocuments'];
        $document->purpose = $validated['purpose'];
        $document->orNumber = $validated['orNumber'];
        $document->numCopies = $validated['numCopies'];
        $document->otherDocument = $validated['otherDocument'];
        $document->dateOfRequest = $validated['dateOfRequest'];

        // Save the document record
        $document->save();

        return response()->json($document, 201); // Return the created document record
    }


    /**
     * Display all requests for the authenticated user.
     */
    public function getEmployeeRequests()
    {
        $userId = auth()->user()->id;

        // Fetch all document requests for the authenticated employee
        $documentRequests = Document::where('employee_id', $userId)->get();

        return response()->json($documentRequests, 200);
    }

    public function getAllRequests()
    {
        // Fetch all document requests along with user details (first name and last name)
        $documentRequests = Document::with('user:id,firstName,lastName')->get();

        // Return the fetched data as JSON
        return response()->json($documentRequests, 200);
    }
}
