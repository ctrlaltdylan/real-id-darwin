<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JkDistroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Austin Allen',
            'email' => 'john.allen2322@gmail.com',
            'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            'shop_id' => 3,
        ]);

        User::create([
            'name' => 'Lacey Kissinger',
            'email' => 'lacey@evocann.com',
            'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            'shop_id' => 3,
        ]); 

        User::create([
            'name' => 'Monique Brown',
            'email' => 'monique@jkdistro.com',
            'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            'shop_id' => 3,
        ]);

        User::create([
            'name' => 'Sandra Escaleira',
            'email' => 'sescalei1@gmail.com',
            'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            'shop_id' => 3,
        ]);


        User::create([
            'name' => 'Shaniece',
            'email' => 'shaniece@jkdistro.com',
            'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            'shop_id' => 3,
        ]);

        User::create([
            'name' => 'Shawna',
            'email' => 'shawna@jkdistro.com',
            'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            'shop_id' => 3,
        ]);

        User::create([
            'name' => 'Thembeka',
            'email' => 'thembeka@jkdistro.com',
            'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            'shop_id' => 3,
        ]);

        User::create([
            'name' => 'Yadira Madriz',
            'email' => 'yadira@jkdistro.com',
            'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
            'shop_id' => 3,
        ]);
    }
}
