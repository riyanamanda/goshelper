<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndikatorKeperawatan extends Model
{
    use HasFactory;

    protected $connection = 'gos_medicalrecord';
    protected $table = 'indikator_keperawatan';
    protected $guarded = [];
    protected $primaryKey = 'ID';
    public $timestamps = false;

    function jenis_indikator()
    {
        return $this->belongsTo(JenisIndikatorKeperawatan::class, 'JENIS', 'ID');
    }
}
