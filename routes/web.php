<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application.
| These routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/* definir las rutas web que se utilizan para cargar
las vistas HTML*/
Route::get('/', function () {
    return view('welcome');
});

Route::get('/ingresar', function () {
    return view('auth.login');
})->name('login');

Route::post('/ingresar', function () {
    return view('auth.login');
})->name('login');

Route::get('/registro', function () {
    return view('auth.Registro');
})->name('registro');

Route::get('/recovery', function () {
    return view('auth.recovery');
})->name('recovery');

Route::get('/code', function () {
    return view('auth.code');
})->name('code');

Route::get('/New-Password', function () {
    return view('auth.New-Password');
})->name('New-Password');

Route::get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

Route::get('/profile', function () {
    return view('profile.profile');
})->name('profile');

Route::get('/ListPatients', function () {
    return view('clinical-histories.list-patients');
})->name('ListPatients');

Route::get('/AddDoctors', function () {
    return view('register-users.AddDoctors');
})->name('AddDoctors');

Route::get('/AddPatients', function () {
    return view('register-users.AddPatients');
})->name('AddPatients');

Route::get('/Services', function () {
    return view('AddServices.Services');
})->name('Services');

Route::get('/clinic-history', function (){
    return view('clinical-histories.historia-clinica');
})->name('clinic-history');
