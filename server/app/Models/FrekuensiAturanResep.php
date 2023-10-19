<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FrekuensiAturanResep extends Model
{
    use HasFactory;

    protected $connection = 'gos_master';
    protected $table = 'frekuensi_aturan_resep';
    protected $primaryKey = 'ID';
    protected $guarded = [];
}
