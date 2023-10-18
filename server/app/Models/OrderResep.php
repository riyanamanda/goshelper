<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderResep extends Model
{
    use HasFactory;

    protected $connection = 'gos_layanan';
    protected $table = 'order_resep';
    protected $guarded = [];
    protected $keyType = 'string';
    public $increment = false;


    function kunjungan_pasien()
    {
        return $this->belongsTo(Kunjungan::class, 'KUNJUNGAN', 'NOMOR');
    }

    function dokter()
    {
        return $this->belongsTo(Dokter::class, 'DOKTER_DPJP', 'ID');
    }

    function pegawai()
    {
        return $this->belongsTo(Pegawai::class, 'PEMBERI_RESEP', 'ID');
    }
}
