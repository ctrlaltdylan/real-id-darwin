<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RealIdProdExtSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shop = Shop::firstOrCreate(
          ['name' => 'PLACEHOLDER', 'api_key' => 'PLACEHOLDER'],
          [
            'title' => 'Real ID Prod Ext',
          ]
        );

        User::firstWhere('email', 'dylan@getverdict.com')->shops()->attach($shop);
    }
}
