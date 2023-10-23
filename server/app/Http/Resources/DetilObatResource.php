<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DetilObatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $rute = $this->RUTE_PEMBERIAN;
        switch ($rute) {
            case 1:
                $rute = "Oral";
                break;
            case 2:
                $rute = "Parenteral";
                break;
            case 3:
                $rute = "Topikal";
                break;
            case 4:
                $rute = "Supositoria (rektal)";
                break;
            case 5:
                $rute = "Parenteral - Subkutan (di bawah kulit)";
                break;
            case 6:
                $rute = "Parenteral - Intramuskular (dalam otot)";
                break;
            case 7:
                $rute = "Parenteral - Intravena (dalam pembuluh darah)";
                break;
            case 8:
                $rute = "Parenteral - Intratekal (sekitar sumsum tulang belakang)";
                break;
            case 9:
                $rute = "Sublingual dan bukal";
                break;
            case 10:
                $rute = "Okular (mata)";
                break;
            case 11:
                $rute = "Otic (telinga)";
                break;
            case 12:
                $rute = "Nasal";
                break;
            default:
                $rute = "-";
                break;
        }

        return [
            "id" => $this->obat->ID,
            "nama_obat" => $this->obat->NAMA,
            "dosis" => $this->DOSIS,
            "jumlah_obat" => (int)$this->JUMLAH,
            "frekuensi" => $this->frekuensi_aturan_pakai->FREKUENSI,
            "rute_pemberian" => $rute,
            "keterangan" => $this->KETERANGAN ?: "-",
            "jadwal" => [
                "pagi" => $this->PAGI,
                "siang" => $this->SIANG,
                "malam" => $this->MALAM
            ]
        ];
    }
}
