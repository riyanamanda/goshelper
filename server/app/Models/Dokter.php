<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dokter extends Model
{
    use HasFactory;

    protected $connection = 'gos_master';
    protected $table = 'dokter';
    protected $guarded = [];

    function pegawai()
    {
        return $this->belongsTo(Pegawai::class, 'NIP', 'NIP');
    }
}
