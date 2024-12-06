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

        return Inertia::render('CheckDetails', $body);
    }

    public function manually_approve(Request $request, $id) {
        $user = $request->user();
        $shop = $user->shop;

        $response = $shop->api()->request('POST', "checks/{$id}/manually-approve");

        $body = json_decode($response->getBody(), true);

        return response()->json($body);
    }

    public function manually_reject(Request $request, $id) {
        $user = $request->user();
        $shop = $user->shop;

        $response = $shop->api()->request('POST', "checks/{$id}/manually-reject");

        $body = json_decode($response->getBody(), true);

        return response()->json($body);
    } 
}
