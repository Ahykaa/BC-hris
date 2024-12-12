<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'prefix',
        'first_name',
        'middle_name',
        'last_name',
        'nickname',
        'gender',
        'religion',
        'civil_status',
        'citizenship',
        'birthday',
        'place_of_birth',
        'phone_number',
        'department_id',
        'phil_no',
        'pagibig_no',
        'tin',
        'sss_no',
        'prc',
        'profile_completed'
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function leaves()
    {
        return $this->hasMany(Leave::class, 'employee_id', 'employee_id');
    }
}
