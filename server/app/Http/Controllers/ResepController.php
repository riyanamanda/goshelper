<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResepDetilResource;
use App\Http\Resources\ResepResource;
use App\Models\OrderResep;

class ResepController extends Controller
{
    function index()
    {
        $resep = OrderResep::query()
            ->with('kunjungan_pasien.pendaftaran.pasien', 'dokter', 'pegawai')
            ->select('NOMOR', 'KUNJUNGAN', 'TANGGAL', 'DOKTER_DPJP', 'PEMBERI_RESEP', 'STATUS')
            ->where('TUJUAN', '101040202')
            ->where('STATUS', 2)
            ->get()
            ->sortDesc();

        return [
            "status" => 200,
            "data" => ResepResource::collection($resep)
        ];
    }

    function detilResep($orderResep)
    {
        $resep = OrderResep::query()
            ->with('detil')
            ->where('NOMOR', $orderResep)
            ->get();

        return [
            "status" => 200,
            "data" => ResepDetilResource::collection($resep)
        ];
    }
}
