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
        // Validate incoming data
        $validated = $request->validate([
            'firstName' => 'required|string|max:255',
            'middleName' => 'nullable|string|max:255',
            'lastName' => 'required|string|max:255',
            'requestedDocuments' => 'required|string',
            'purpose' => 'required|string',
            'orNumber' => 'nullable|string',
            'numCopies' => 'required|integer|min:1',
            'otherDocument' => 'nullable|string',
            'dateOfRequest' => 'required|date',
        ]);

        // Create the document record
        $document = new Document();
        $document->employee_id = auth()->user()->id; // Use the authenticated user's ID
        $document->firstName = $validated['firstName'];
        $document->middleName = $validated['middleName'];
        $document->lastName = $validated['lastName'];
        $document->requestedDocuments = $validated['requestedDocuments'];
        $document->purpose = $validated['purpose'];
        $document->orNumber = $validated['orNumber'];
        $document->numCopies = $validated['numCopies'];
        $document->otherDocument = $validated['otherDocument'];
        $document->dateOfRequest = $validated['dateOfRequest'];

        // Save the document record to the database
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
}
