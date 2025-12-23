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

    public function new(Request $request) {
        $shop = $request->attributes->get('currentShop');

        // Fetch shop data to get default content
        try {
            $response = $shop->api()->request('GET', 'shop');
            $shopData = json_decode($response->getBody(), true);
            $defaultContent = $shopData['settings']['defaultContent'] ?? '';
        } catch (\Exception $e) {
            $defaultContent = '';
        }

        return Inertia::render('NewCheck', [
            'defaultContent' => $defaultContent,
        ]);
    }

    public function create(Request $request) {
        $shop = $request->attributes->get('currentShop');

        // If no shop from middleware (e.g., API call), fall back to shopName param
        if (!$shop) {
            $shopName = $request->input('shopName');
            $shop = Shop::where('name', $shopName)->first();
        }

        if (!$shop) {
            return response()->json(['error' => 'Shop not found'], 404);
        }

        try {
            $response = $shop->api()->request('POST', 'checks/create', [
                'json' => $request->all(),
            ]);

            $body = json_decode($response->getBody(), true);

            // If this is an Inertia request, redirect to the check details page
            if ($request->header('X-Inertia')) {
                $checkId = $body['check']['id'];
                return redirect()->route('checks.show', $checkId)->with('message', 'ID check created and sent successfully')->with('status', 'success');
            }

            // Otherwise return JSON (for API calls)
            return response()->json($body);
        } catch (\Exception $e) {
            if ($request->header('X-Inertia')) {
                return back()->withErrors(['error' => 'Failed to create ID check: ' . $e->getMessage()]);
            }
            return response()->json(['error' => 'Failed to create ID check: ' . $e->getMessage()], 500);
        }
    }

}
