<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
      // request attributes don't exist in this middleware for some reason
      $currentShopId = $request->session()->get('current_shop_id');
      // handle if the user is logged in or not
      if($request->user()) {
        $shop = $request->user()->shops()->findOrFail($currentShopId);
        $shops = $request->user()->shops;
      } else {
        $shop = null;
        $shops = [];
      }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'currentShop' => $shop,
                'shops' => $shops,
            ],
            'context' => [
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'toast' => [
                'message' => $request->session()->get('message'),
                'status' => $request->session()->get('status'),
            ],
        ];
    }
}
