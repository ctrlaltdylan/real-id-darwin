<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CurrentShopMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
       $user = $request->user();
        
        // Try to get shop_id from session
        $currentShopId = session('current_shop_id');
        
        if ($currentShopId) {
            // Check if user has access to this shop
            $shop = $user->shops()->find($currentShopId);
            if ($shop) {
              $request->attributes->set('currentShop', $shop);
              return $next($request);
            }
        }
        
        // Fallback to first shop
        $shop = $user->shops()->first();
        $request->attributes->set('currentShop', $shop);
        
        if (!$shop) {
            abort(403, 'No shops associated with this user');
        }
        
        // Store in session for next time
        session(['current_shop_id' => $shop->id]);
        
        return $next($request);
    }
}
