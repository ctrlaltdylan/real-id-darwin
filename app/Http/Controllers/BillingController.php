<?php

namespace App\Http\Controllers;

use Stripe\StripeClient;
use Inertia\Inertia;

class BillingController extends Controller
{
    public function index()
    {
        $shop = auth()->user()->shop;

        $res = $shop->api()->request('GET', 'shop');  
        $data = $res->json();

        $subscription = $data['stripeSubscriptionId'];

        $stripe = new StripeClient(env('STRIPE_KEY'));

        $subscription = $stripe->subscriptions->retrieve($subscription);


        return Inertia::render('Billing', [
            'shop' => $data,
            'subscription' => $subscription,
        ]);
    }
}
