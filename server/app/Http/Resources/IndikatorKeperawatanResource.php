<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IndikatorKeperawatanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->ID,
            'deskripsi' => $this->DESKRIPSI,
            'jenis' => new JenisIndikatorKeperawatanResource($this->jenis_indikator),
        ];
    }
}
