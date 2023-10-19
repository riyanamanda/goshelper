<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResepDetilResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "no_rekam_medis" => $this->kunjungan_pasien->pendaftaran->NORM,
            "pasien" => $this->kunjungan_pasien->pendaftaran->pasien->NAMA,
            "tanggal_lahir" => $this->kunjungan_pasien->pendaftaran->pasien->TANGGAL_LAHIR,
            "dpjp" => $this->dokter->pegawai->GELAR_DEPAN . ". " . $this->dokter->pegawai->NAMA . ", " . $this->dokter->pegawai->GELAR_BELAKANG,
            "pemberi_resep" => $this->pegawai->GELAR_DEPAN . ". " . $this->pegawai->NAMA . ", " . $this->pegawai->GELAR_BELAKANG,
            "no_hp_pemberi_resep" => $this->NO_HP_PEMBERI_RESEP,
            "tanggal" => $this->TANGGAL,
            "detil" => DetilObatResource::collection($this->detil)
        ];
    }
}
