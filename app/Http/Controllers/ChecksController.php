<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Shop;

class ChecksController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $shop = $request->attributes->get('currentShop');

        $filters = $request->input('checkStatuses', []);
        $term = $request->input('searchTerm', '');
        $archived = $request->input('archived', false);

        $response = $shop->api()->request('GET', 'checks', [
            'query' => [
                'checkStatuses' => $filters,
                'searchTerm' => $term,
                'archived' => $archived,
                'page' => $request->input('page', 0),
            ],
        ]);

        $body = json_decode($response->getBody(), true);

        $props = [
            'checks' => $body['checks'],
            'totalChecks' => $body['totalChecks'],
            'totalPages' => $body['totalPages'],
            'page' => $body['page'],
            'size' => $body['size'],
            'searchTerm' => $body['searchTerm'],
            'checkStatuses' => $body['checkStatuses'],
            'archived' => $body['archived'],
        ];

        return Inertia::render('Dashboard', $props);
    }

    public function show(Request $request, $id) {
        $shop = $request->attributes->get('currentShop');

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
        $shop = $request->attributes->get('currentShop');

        $response = $shop->api()->request('POST', "checks/{$id}/manual-approval");

        $body = json_decode($response->getBody(), true);

        return redirect()->route('checks.show', $id)->with('message', 'Manually approved ID check')->with('status', 'success');
    }

    public function manually_reject(Request $request, $id) {
        $shop = $request->attributes->get('currentShop');

        $response = $shop->api()->request('POST', "checks/{$id}/manual-rejection");

        $body = json_decode($response->getBody(), true);

        return redirect()->route('checks.show', $id)->with('message', 'Manually rejected ID check')->with('status', 'success');
    }

    public function delete_data(Request $request, $id) {
        $shop = $request->attributes->get('currentShop');

        $response = $shop->api()->request("DELETE", "checks/{$id}/data");

        $body = json_decode($response->getBody(), true);

        return redirect()->route('checks.show', $id)->with('message', 'Customer photos deleted')->with('status', 'success');
    }

    public function create(Request $request) {
      $shopName = $request->input('shopName');
      // for demo purposes only for now
        // $shop = $request->attributes->get('currentShop');
        $shop = Shop::where('name', $shopName)->first();

        $response = $shop->api()->request('POST', 'checks/create', [
            'json' => $request->all(),
        ]);

        $body = json_decode($response->getBody(), true);

        // return redirect()->route('checks.show', $body['check']['id'])->with('message', 'ID check created')->with('status', 'success');
        return response()->json($body);
    }

}
