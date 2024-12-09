<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChecksController extends Controller
{
    //
    public function index(Request $request)
    {
        $user = $request->user();
        $shop = $user->shop;

        $response = $shop->api()->request('GET', 'checks');

        $body = json_decode($response->getBody(), true);

        return Inertia::render('Dashboard', $body);
    }

    public function show(Request $request, $id) {
        $user = $request->user();
        $shop = $user->shop;

        $response = $shop->api()->request('GET', "checks/{$id}");

        $body = json_decode($response->getBody(), true);

        $shop_response = $shop->api()->request('GET', 'shop');
        $shop_body = json_decode($shop_response->getBody(), true);

        $json = [
            'check' => $body['check'],
            'shop' => $shop_body,
        ];

        return Inertia::render('CheckDetails', $json);
    }

    public function manually_approve(Request $request, $id) {
        $user = $request->user();
        $shop = $user->shop;

        $response = $shop->api()->request('POST', "checks/{$id}/manual-approval");

        $body = json_decode($response->getBody(), true);

        return redirect()->route('checks.show', $id)->with('message', 'Manually approved ID check')->with('status', 'success');
    }

    public function manually_reject(Request $request, $id) {
        $user = $request->user();
        $shop = $user->shop;

        $response = $shop->api()->request('POST', "checks/{$id}/manual-rejection");

        $body = json_decode($response->getBody(), true);

        return redirect()->route('checks.show', $id)->with('message', 'Manually rejected ID check')->with('status', 'success');
    } 
}
