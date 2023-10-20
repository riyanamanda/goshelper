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
            "nama_pasien" => $this->kunjungan_pasien->pendaftaran->pasien->NAMA,
            "tanggal_lahir" => $this->kunjungan_pasien->pendaftaran->pasien->TANGGAL_LAHIR,
            "jenis_kelamin" => $this->kunjungan_pasien->pendaftaran->pasien->JENIS_KELAMIN == 1 ? "L" : "P",
            "dpjp" => $this->dokter->pegawai->GELAR_DEPAN . ". " . $this->dokter->pegawai->NAMA . ", " . $this->dokter->pegawai->GELAR_BELAKANG,
            "pemberi_resep" => $this->pegawai->GELAR_DEPAN . ". " . $this->pegawai->NAMA . ", " . $this->pegawai->GELAR_BELAKANG,
            "no_hp_pemberi_resep" => $this->NO_HP_PEMBERI_RESEP,
            "tanggal_order" => $this->TANGGAL,
            "ruang_inap" => null,
            "obat" => DetilObatResource::collection($this->detil)
        ];
    }
}
