<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class FamilyBackground extends Model
{
    use HasFactory;

    // Specify fillable fields for mass assignment
    protected $fillable = [
        'personal_info_id',
        'father_name',
        'father_occupation',
        'father_contact_number',
        'father_date_of_birth',
        'mother_name',
        'mother_occupation',
        'mother_contact_number',
        'mother_date_of_birth',
        'spouse_name',
        'spouse_occupation',
        'spouse_contact_number',
        'spouse_date_of_birth',
        'emergency_contact_name',
        'emergency_contact_address',
        'emergency_contact_number',
        'emergency_contact_relationship',
    ];

    // Define the relationship with PersonalInfo
    public function personalInfo()
    {
        return $this->belongsTo(PersonalInfo::class);
    }
}
