<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'firstName',
        'middleName',
        'lastName',
        'requestedDocuments',
        'purpose',
        'orNumber',
        'numCopies',
        'otherDocument',
        'dateOfRequest',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'employee_id', 'id');
    }
}
