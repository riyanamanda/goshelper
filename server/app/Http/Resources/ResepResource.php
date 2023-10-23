<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResepResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "nomor" => $this->NOMOR,
            "kunjungan" => $this->KUNJUNGAN,
            "no_rekam_medis" => $this->kunjungan_pasien->pendaftaran->NORM,
            "pasien" => $this->kunjungan_pasien->pendaftaran->pasien->NAMA,
            "dpjp" => $this->dokter->pegawai->GELAR_DEPAN . ". " . $this->dokter->pegawai->NAMA . ", " . $this->dokter->pegawai->GELAR_BELAKANG,
            "pemberi_resep" => $this->pegawai->GELAR_DEPAN . ". " . $this->pegawai->NAMA . ", " . $this->pegawai->GELAR_BELAKANG,
            "tanggal" => $this->TANGGAL,
            "status" => $this->STATUS,
        ];
    }
}
