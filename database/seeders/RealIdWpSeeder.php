<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Shop;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class RealIdWpSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $shop = Shop::firstOrCreate([
            'name' => 'https://real-id-wp-staging.verdict.com',
            'api_key' => '',
        ]);

        //
        User::firstOrCreate(
            ['email' => 'dylan+wpstaging@getverdict.com'],
            [
                'name' => 'Dylan',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
                'shop_id' => $shop->id,
            ]
        );
    }
}
