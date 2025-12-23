<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RealIdBcDevSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shop = Shop::firstOrCreate(
          ['name' => 'nug4ejpavx', 'api_key' => 'IalVBj1aLjTRGQpwpauiK'],
          [
            'title' => 'Real ID BC Dev',
          ]
        );

        User::firstWhere('email', 'dylan@getverdict.com')->shops()->attach($shop);
    }
}
