<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CalendarApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Ruta protegida por el middleware de autenticacion "auth:sanctun" rutas accesibles solo para usuarios logeados
/*no verifica el token Csrf en las solicitudes API, el middleware es utilizado
para autenticar solicitudes api con tokens de autenticacion*/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// api.php



Route::get('/calendario', [CalendarApiController::class, 'index']);
Route::post('/calendario', [CalendarApiController::class, 'store']);
Route::put('/calendario/{id}', [CalendarApiController::class, 'update']);
Route::delete('/calendario/{id}', [CalendarApiController::class, 'destroy']);
Route::get('/rol', [RolApiController::class, 'index']);
