<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HighWirePayments extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shop = Shop::firstOrCreate(
          ['name' => 'https://highwirepayments.com'],
          [
            'title' => 'HighWire Payments',
          ]
        );

        User::firstOrCreate(
            ['email' => 'brandon@highwirepayments.com'],
            [
                'name' => 'Brandon Michaud',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            ]
        )->shops()->attach($shop);

        User::findByEmail('dylan@getverdict.com')->shops()->attach($shop);
    }
}
