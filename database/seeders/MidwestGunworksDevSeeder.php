<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class MidwestGunworksDevSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shop = Shop::firstOrCreate(
          ['name' => 'PLACEHOLDER', 'api_key' => 'PLACEHOLDER'],
          [
            'title' => 'Midwest Gunworks Dev',
          ]
        );

        User::firstWhere('email', 'dylan@getverdict.com')->shops()->attach($shop);

        $newUsers = [
            ['name' => 'Dave', 'email' => 'dave@midwestgunworks.com'],
            ['name' => 'Bens', 'email' => 'bens@midwestgunworks.com'],
        ];

        foreach ($newUsers as $attrs) {
            $user = User::firstOrCreate(
                ['email' => $attrs['email']],
                [
                    'name' => $attrs['name'],
                    'password' => Hash::make('password'),
                ]
            );

            $user->shops()->syncWithoutDetaching([$shop->id]);
        }
    }
}
