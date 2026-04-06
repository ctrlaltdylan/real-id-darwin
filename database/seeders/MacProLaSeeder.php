<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class MacProLaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shop = Shop::firstOrCreate(
          ['name' => 'macpro-la.myshopify.com'],
          [
            'api_key' => 'PLACEHOLDER',
          ]
        );

        User::firstWhere('email', 'dylan@getverdict.com')->shops()->attach($shop);
    }
}
