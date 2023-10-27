<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisIndikatorKeperawatan extends Model
{
    use HasFactory;

    protected $connection = 'gos_medicalrecord';
    protected $table = 'jenis_indikator_keperawatan';
    protected $guarded = [];
    protected $primaryKey = 'ID';
}
