<?php

namespace App\Http\Controllers;

use App\Http\Resources\PrintResource;
use App\Http\Resources\ResepDetilResource;
use App\Http\Resources\ResepResource;
use App\Models\OrderDetilResep;
use App\Models\OrderResep;
use Illuminate\Http\Request;

class ResepController extends Controller
{
    function index()
    {
        $resep = OrderResep::query()
            ->with('kunjungan_pasien.pendaftaran.pasien', 'dokter', 'pegawai')
            ->select('NOMOR', 'KUNJUNGAN', 'TANGGAL', 'DOKTER_DPJP', 'PEMBERI_RESEP', 'STATUS')
            ->where('TUJUAN', '101040202')
            ->where('STATUS', 2)
            ->get();

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

    function updateDetilResep(Request $request)
    {
        OrderDetilResep::where('ORDER_ID', $request->data['nomor_resep'])
            ->where('FARMASI', $request->data['id_obat'])
            ->update([
                str()->upper($request->data['jadwal']['waktu']) => $request->data['jadwal']['status']
            ]);

        return [
            "status" => 200,
            "data" => []
        ];
    }

    function printResep($orderResep)
    {
        $resep = OrderResep::query()
            ->with('detil')
            ->where('NOMOR', $orderResep)
            ->get();

        return [
            "status" => 200,
            "data" => PrintResource::collection($resep)
        ];
    }
}
