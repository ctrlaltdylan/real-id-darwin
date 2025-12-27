<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\StripeClient;

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

        // Fetch shop settings from Core API
        try {
            $response = $shop->api()->get('shop');
            $shopData = json_decode($response->getBody()->getContents(), true);
        } catch (\Exception $e) {
            $shopData = ['settings' => []];
        }

        // Fetch subscription from Stripe if stripeSubscriptionId exists
        $subscription = null;
        if (!empty($shopData['stripeSubscriptionId'])) {
            try {
                $stripe = new StripeClient(env('STRIPE_API_KEY'));
                $subscription = $stripe->subscriptions->retrieve(
                    $shopData['stripeSubscriptionId'],
                    ['expand' => ['items.data.price.product']]
                );
            } catch (\Exception $e) {
                // Subscription fetch failed, leave as null
            }
        }

        return Inertia::render('Settings', [
            'shop' => $shop,
            'shopData' => $shopData,
            'subscription' => $subscription,
        ]);
    }

    public function updateSettings(Request $request)
    {
        $shop = $request->attributes->get('currentShop');

        try {
            \Log::info('Settings update request', [
                'shop_id' => $shop->id,
                'shop_name' => $shop->name,
                'api_key' => substr($shop->api_key, 0, 8) . '...',
                'payload' => $request->all(),
            ]);

            $response = $shop->api()->patch('shop/settings/v2', [
                'json' => $request->all(),
            ]);

            $body = json_decode($response->getBody()->getContents(), true);

            \Log::info('Settings update response', [
                'status' => $response->getStatusCode(),
                'body' => $body,
            ]);

            if ($response->getStatusCode() !== 200) {
                \Log::warning('Settings update returned non-200 status', [
                    'status' => $response->getStatusCode(),
                ]);
                return back()->with('message', 'Failed to update settings: Unexpected response')->with('status', 'error');
            }

            return back()->with('message', 'Settings updated successfully')->with('status', 'success');
        } catch (\Exception $e) {
            \Log::error('Settings update failed', [
                'shop_id' => $shop->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return back()->with('message', 'Failed to update settings: ' . $e->getMessage())->with('status', 'error');
        }
    }

    public function sendTestWebhook(Request $request)
    {
        $shop = $request->attributes->get('currentShop');

        try {
            $response = $shop->api()->post('checks/send-test-webhook', [
                'json' => $request->only(['webhookUrl', 'webhookSecret']),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Test webhook sent successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send test webhook: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function billingPortal(Request $request)
    {
        $shop = $request->attributes->get('currentShop');

        try {
            // Fetch shop data to get Stripe customer ID
            $response = $shop->api()->get('shop');
            $shopData = json_decode($response->getBody()->getContents(), true);

            if (empty($shopData['stripeCustomerId'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'No Stripe customer found',
                ], 400);
            }

            $stripe = new StripeClient(env('STRIPE_API_KEY'));
            $sessionParams = [
                'customer' => $shopData['stripeCustomerId'],
                'return_url' => route('settings') . '?tab=billing',
            ];

            // Add portal configuration if specified
            if (env('STRIPE_PORTAL_CONFIG_ID')) {
                $sessionParams['configuration'] = env('STRIPE_PORTAL_CONFIG_ID');
            }

            $session = $stripe->billingPortal->sessions->create($sessionParams);

            return response()->json([
                'success' => true,
                'url' => $session->url,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create billing portal session: ' . $e->getMessage(),
            ], 500);
        }
    }
}
