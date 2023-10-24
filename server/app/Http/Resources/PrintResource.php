<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PrintResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "tanggal_order" => $this->TANGGAL,
            "pasien" => [
                "no_rekam_medis" => $this->kunjungan_pasien->pendaftaran->NORM,
                "nama" => $this->kunjungan_pasien->pendaftaran->pasien->NAMA,
                "tanggal_lahir" => $this->kunjungan_pasien->pendaftaran->pasien->TANGGAL_LAHIR,
                "jenis_kelamin" => $this->kunjungan_pasien->pendaftaran->pasien->JENIS_KELAMIN == 1 ? "L" : "P"
            ],
            "dpjp" => $this->dokter->pegawai->GELAR_DEPAN . ". " . $this->dokter->pegawai->NAMA . ", " . $this->dokter->pegawai->GELAR_BELAKANG,
            "pemberi_resep" => $this->pegawai->GELAR_DEPAN . ". " . $this->pegawai->NAMA . ", " . $this->pegawai->GELAR_BELAKANG,
            "ruangan" => [],
            "waktu" => [
                "pagi" => $this->when(count($this->detil->where('PAGI', true)), DetilObatResource::collection($this->detil->where('PAGI', true))),
                "siang" => $this->when(count($this->detil->where('SIANG', true)), DetilObatResource::collection($this->detil->where('SIANG', true))),
                "malam" => $this->when(count($this->detil->where('MALAM', true)), DetilObatResource::collection($this->detil->where('MALAM', true))),
            ]
        ];
    }
}
