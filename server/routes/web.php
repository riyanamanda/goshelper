<?php

use App\Http\Controllers\KeperawatanController;
use App\Http\Controllers\ResepController;
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
        Route::get('/api/resep/{orderResep}/detil', 'detilResep');
        Route::get('/api/resep/{orderResep}/print', 'printResep');
        Route::patch('/api/resep/detil/update', 'updateDetilResep');
    });

Route::controller(KeperawatanController::class)
    ->group(function () {
        Route::get('/api/keperawatan', 'index');
    });

require __DIR__ . '/auth.php';
