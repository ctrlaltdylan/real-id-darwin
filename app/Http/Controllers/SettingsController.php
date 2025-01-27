<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
class SettingsController extends Controller
{
    public function index(Request $request) {
        $user = $request->user();
       $shop = $user->shop;

        $response = $shop->api()->request('GET', 'shop');
        $body = json_decode($response->getBody(), true);

        return Inertia::render('Settings', ['shop' => $body]);
    }

    public function update(Request $request) {
        $user = $request->user();
        $shop = $user->shop;

        $response = $shop->api()->request('POST', 'shop/settings/v2',[
          'json' => $request->all()
        ]);

        $body = json_decode($response->getBody(), true);


        return redirect()->route('settings')->with('message', 'Settings updated');
    } 
}
