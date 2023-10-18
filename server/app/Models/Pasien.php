<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pasien extends Model
{
    use HasFactory;

    protected $connection = 'gos_master';
    protected $table = 'pasien';
    protected $guarded = [];
    protected $keyType = 'string';
    public $increment = false;
}
