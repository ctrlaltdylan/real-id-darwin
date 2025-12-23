<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CmmgSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shop = Shop::firstOrCreate(
          ['name' => 'https://cmmg.com'],
          [
            'title' => 'CMMG',
          ]
        );
        $dev_shop = Shop::firstOrCreate(
          ['name' => 'https://dev.cmmg.com'],
          [
            'title' => 'CMMG Dev',
          ]
        );


        $user =User::firstOrCreate(
            ['email' => 'jacobb@cmmg.com'],
            [
                'name' => 'Jacob Blackorby',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            ]
        );
        $user->shops()->attach($shop);
        $user->shops()->attach($dev_shop);

        User::firstWhere('email', 'dylan@getverdict.com')->shops()->attach($shop);
        User::firstWhere('email', 'dylan@getverdict.com')->shops()->attach($dev_shop);
    }
}
