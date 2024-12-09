<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalInfo extends Model
{
    use HasFactory;
    protected $fillable = [
        'employee_id',
        'prefix',
        'firstName',
        'lastName',
        'middleName',
        'nickName',
        'gender',
        'religion',
        'civilStatus',
        'citizenship',
        'birthday',
        'placeofbirth',
        'email',
        'dept_id',
        'position',
        'type',
        'houseNumber',
        'street',
        'barangay',
        'city',
        'province',
        'zip',
        'placeOfBirth',
        'philHealth_no',
        'pagibig_no',
        'tin',
        'sss_no',
        'prc_id',
    ];
    public function department()
    {
        return $this->belongsTo(Department::class, 'dept_id');
    }

    public function familyBackground()
    {
        return $this->hasOne(FamilyBackground::class);
    }

}
