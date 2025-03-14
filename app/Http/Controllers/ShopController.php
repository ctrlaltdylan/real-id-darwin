<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    // Switch the current shop context
    public function switch(Request $request)
    {
        // $request->validate([
        //     'id' => 'required'
        // ]);
        $user = $request->user();
        $shop = $user->shops()->findOrFail($request->id);
        session(['current_shop_id' => $shop->id]);

        $request->attributes->set('currentShop', $shop);

        return redirect()->route('dashboard');
    }

    public function settings(Request $request)
    {
        $shop = $request->attributes->get('currentShop');

        return Inertia::render('Settings', ['shop' => $shop]);
    }
}
