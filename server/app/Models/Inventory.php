<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $connection = 'gos_inventory';
    protected $table = 'barang';
    protected $primaryKey = 'ID';
    protected $guarded = [];
}
