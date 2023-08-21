<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    
    public function register(Request $request)
    {
        return view('auth.register');
    }
    public function login(Request $request)
    {
        $credentials = [
            "emails" => $request->email,
            "password" =>  $request->password,
        ];

            //$remember
            console.log("holas");
            if (Auth::attempt($credentials)) {
                $request->session()->regenerate();
                return redirect()->intended(route('Services'));
            }else{
                return redirect('ListPatients');
            };

        //return view('auth.login');
    }

    public function logout(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect(route('ListPatients'));
    }
}
