<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Shop;
use Illuminate\Support\Facades\Hash;
class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shop = Shop::create([
            'name' => 'real-id-dev.myshopify.com',
            'api_key' => 'MOoRHH3m8p2WQxVgpX1sn',
        ]);

        $user = User::create([
            'name' => 'Dylan',
            'email' => 'dylan@getverdict.com',
            'password' => Hash::make('password'),
            'shop_id' => $shop->id,
        ]);

    }
}
