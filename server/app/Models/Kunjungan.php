<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kunjungan extends Model
{
    use HasFactory;

    protected $connection = 'gos_pendaftaran';
    protected $table = 'kunjungan';
    protected $guarded = [];
    protected $keyType = 'string';
    public $increment = false;

    function pendaftaran()
    {
        return $this->belongsTo(Pendaftaran::class, 'NOPEN', 'NOMOR');
    }
}
