<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pegawai extends Model
{
    use HasFactory;

    protected $connection = 'gos_master';
    protected $table = 'pegawai';
    protected $guarded = [];
}
