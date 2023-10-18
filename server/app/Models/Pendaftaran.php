<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pendaftaran extends Model
{
    use HasFactory;

    protected $connection = 'gos_pendaftaran';
    protected $table = 'pendaftaran';
    protected $guarded = [];
    protected $keyType = 'string';
    public $increment = false;

    function pasien()
    {
        return $this->belongsTo(Pasien::class, 'NORM', 'NORM');
    }
}
