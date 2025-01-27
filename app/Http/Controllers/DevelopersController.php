<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
class DevelopersController extends Controller
{
    //
    public function index(Request $request) {
        $user = $request->user();
        $shop = $user->shop;

        $response = $shop->api()->request('GET', 'shop');
        $body = json_decode($response->getBody(), true);

        return Inertia::render('Developers', ['shop' => $body]);
    }
}
