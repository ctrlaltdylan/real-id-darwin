<?php

use App\Http\Controllers\ChecksController;
use App\Http\Controllers\DevelopersController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShopController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $user = auth()->user();

    if($user) {
        return redirect()->route('dashboard');
    } else {
        return redirect()->route('login');
    }

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => false, //Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', [ChecksController::class, 'index'])->middleware(['auth', 'verified', 'current.shop'])->name('dashboard');

Route::middleware(['auth', 'current.shop'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/checks/{id}', [ChecksController::class, 'show'])->name('checks.show');
    Route::post('/checks/{id}/manually-approve', [ChecksController::class, 'manually_approve'])->name('checks.manually_approve'); 
    Route::post('/checks/{id}/manually-reject', [ChecksController::class, 'manually_reject'])->name('checks.manually_reject');
    Route::post('/checks/{id}/delete-data', [ChecksController::class, 'delete_data'])->name('checks.delete_data');

    Route::post('/checks', [ChecksController::class, 'create'])->name('checks.create');

    Route::get('/developers', [DevelopersController::class, 'index'])->name('developers');
    Route::get('/billing', [BillingController::class, 'index'])->name('billing');

    Route::get('/settings', [ShopController::class, 'settings'])->name('settings');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/shop/{id}/switch', [ShopController::class, 'switch'])->name('shop.switch');
});

Route::middleware(['auth', 'superadmin'])->group(function () {
    Route::prefix('sa')->group(function () {
        // Define your super admin routes here
    });
});


Route::group(['prefix' => 'api'], function () {
    Route::post('/queue', [JobController::class, 'store'])->name('api.queue');
});


Route::get('/checkout', function () {
    return Inertia::render('Checkout');
});

Route::get('/order-status', function (Request $request) {
    return Inertia::render('OrderStatus');
});

Route::post('/api/checks/create', [ChecksController::class, 'create'])->name('api.checks.create');



require __DIR__.'/auth.php';
