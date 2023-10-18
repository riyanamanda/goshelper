<?php

use App\Http\Controllers\ResepController;
use App\Models\OrderResep;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::controller(ResepController::class)
    ->group(function () {
        Route::get('/api/resep', 'index');
    });

require __DIR__ . '/auth.php';
