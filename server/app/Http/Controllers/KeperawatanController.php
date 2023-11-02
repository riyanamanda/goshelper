<?php

namespace App\Http\Controllers;

use App\Http\Resources\IndikatorKeperawatanResource;
use App\Http\Resources\JenisIndikatorKeperawatanResource;
use App\Models\IndikatorKeperawatan;
use App\Models\JenisIndikatorKeperawatan;
use Error;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KeperawatanController extends Controller
{
    function index()
    {
        $indikator = IndikatorKeperawatan::query()
            ->select('ID', 'JENIS', 'DESKRIPSI')
            ->orderBy('ID', 'DESC')
            ->get();

        return IndikatorKeperawatanResource::collection($indikator);
    }

    function store(Request $request)
    {
        $request->validate([
            'indikator' => 'required|string|max:100',
            'jenis' => 'required|string'
        ]);

        $duplicateCheck = IndikatorKeperawatan::query()
            ->where('JENIS', $request->jenis)
            ->where('DESKRIPSI', $request->indikator)
            ->count();

        if ($duplicateCheck > 0) {
            // return throw new \Exception("Data telah ada, periksa kembali inputan anda.", 422);
            return new JsonResponse("Data telah ada, periksa kembali inputan anda.", 403);
        }

        IndikatorKeperawatan::create([
            'JENIS' => $request->jenis,
            'DESKRIPSI' => $request->indikator
        ]);

        return response()->json([
            'status' => 200,
            'data' => null,
            'message' => "Input data berhasil"
        ]);
    }

    function jenis()
    {
        $jenis = JenisIndikatorKeperawatan::all();

        return JenisIndikatorKeperawatanResource::collection($jenis);
    }
}
