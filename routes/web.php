<?php

use App\Http\Controllers\ChecksController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', [ChecksController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/checks/{id}', [ChecksController::class, 'show'])->name('checks.show');
    Route::post('/checks/{id}/manually-approve', [ChecksController::class, 'manually_approve'])->name('checks.manually_approve'); 
    Route::post('/checks/{id}/manually-reject', [ChecksController::class, 'manually_reject'])->name('checks.manually_reject');
});

require __DIR__.'/auth.php';