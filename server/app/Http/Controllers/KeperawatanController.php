<?php

namespace App\Http\Controllers;

use App\Http\Resources\IndikatorKeperawatanResource;
use App\Models\IndikatorKeperawatan;
use Illuminate\Http\Request;

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
}
