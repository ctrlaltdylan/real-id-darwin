<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PplsPlug extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shop = Shop::firstOrCreate(
          ['name' => 'https://thepplsplug.com'],
          [
            'title' => 'ThePplsPlug',
          ]
        );

        User::firstOrCreate(
            ['email' => 'john.allen2322@gmail.com'],
            [
                'name' => 'Austin Allen',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            ]
        )->shops()->attach($shop);

        User::firstOrCreate(
            ['email' => 'john.allen2322@gmail.com'],
            [
                'name' => 'Cheyenne Martinez',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            ]
        )->shops()->attach($shop);

        User::firstOrCreate(
            ['email' => 'lacey@evocann.com'],
            [
                'name' => 'Lacey Kissinger',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            ]
        )->shops()->attach($shop);

        User::firstOrCreate(
            ['email' => 'monique@jkdistro.com'],
            [
                'name' => 'Monique Brown',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            ]
        )->shops()->attach($shop);

        User::firstOrCreate(
            ['email' => 'sescalei1@gmail.com'],
            [
                'name' => 'Sandra Escaleira',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            ]
        )->shops()->attach($shop);

        User::firstOrCreate(
            ['email' => 'shaniece@jkdistro.com'],
            [
                'name' => 'Shaniece',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            ]
        )->shops()->attach($shop);

        User::firstOrCreate(
            ['email' => 'shawna@jkdistro.com'],
            [
                'name' => 'Shawna',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            ]
        )->shops()->attach($shop);

        User::firstOrCreate(
            ['email' => 'thembeka@jkdistro.com'],
            [
                'name' => 'Thembeka',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
                'shop_id' => 3,
            ]
        );

        User::firstOrCreate(
            ['email' => 'yadira@jkdistro.com'],
            [
                'name' => 'Yadira Madriz',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            ]
        )->shops()->attach($shop);

        User::firstOrCreate(
            ['email' => 'info@jkdistro.com'],
            [
                'name' => '',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            ]
        )->shops()->attach($shop);

        User::firstOrCreate(
            ['email' => 'C87721642@gmail.com'],
            [
                'name' => 'Cheyenne Martinez',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            ]
        )->shops()->attach($shop);

        User::firstOrCreate(
            ['email' => 'sean@getautomized.com'],
            [
                'name' => 'Sean Pray',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            ]
        )->shops()->attach($shop);


        User::firstOrCreate(
            ['email' => 'support+jkdistro@getverdict.com.com'],
            [
                'name' => 'Real ID Support',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            ]
        )->shops()->attach($shop);
    }
}
