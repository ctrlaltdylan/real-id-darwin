<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
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
      
      if (!$currentShopId && $request->user()) {
          $currentShopId = $request->user()->shops()->first()->id ?? null;
      }
      \Log::debug('Current Shop ID: ' . $currentShopId);

      // handle if the user is logged in or not
      if($request->user()) {
        $shop = $request->user()->shops()->findOrFail($currentShopId);
        $shops = $request->user()->shops;
      } else {
        $shop = null;
        $shops = [];
      }

      $currentShopPayload = null;
      if ($shop) {
          $currentShopPayload = $shop->toArray();
          $currentShopPayload['sandboxMode'] = $this->fetchSandboxMode($shop);
      }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'currentShop' => $currentShopPayload,
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

    /**
     * Fetch the upstream shop's sandboxMode flag, cached briefly so the
     * shared-prop middleware doesn't hit the core API on every request.
     */
    private function fetchSandboxMode($shop): bool
    {
        return Cache::remember("shop:{$shop->id}:sandbox_mode", 30, function () use ($shop) {
            try {
                $response = $shop->api()->request('GET', 'shop');
                $body = json_decode($response->getBody(), true) ?? [];
                return (bool) ($body['sandboxMode'] ?? false);
            } catch (\Throwable $e) {
                \Log::warning("Failed to fetch sandboxMode for shop {$shop->id}: {$e->getMessage()}");
                return false;
            }
        });
    }
}
