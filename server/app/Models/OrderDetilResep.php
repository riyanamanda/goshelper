<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetilResep extends Model
{
    use HasFactory;

    protected $connection = 'gos_layanan';
    protected $table = 'order_detil_resep';
    protected $primaryKey = 'ORDER_ID';
    protected $guarded = [];
    protected $keyType = 'string';
    public $increment = false;

    function frekuensi_aturan_pakai()
    {
        return $this->belongsTo(FrekuensiAturanResep::class, 'FREKUENSI', 'ID');
    }

    function obat()
    {
        return $this->belongsTo(Inventory::class, 'FARMASI', 'ID');
    }
}
