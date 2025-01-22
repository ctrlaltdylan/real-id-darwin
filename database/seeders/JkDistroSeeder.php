<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class JkDistroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'john.allen2322@gmail.com'],
            [
                'name' => 'Austin Allen',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
                'shop_id' => 3,
            ]
        );

        User::firstOrCreate(
            ['email' => 'john.allen2322@gmail.com'],
            [
                'name' => 'Cheyenne Martinez',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
                'shop_id' => 3,
            ]
        );

        User::firstOrCreate(
            ['email' => 'lacey@evocann.com'],
            [
                'name' => 'Lacey Kissinger',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
                'shop_id' => 3,
            ]
        );

        User::firstOrCreate(
            ['email' => 'monique@jkdistro.com'],
            [
                'name' => 'Monique Brown',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
                'shop_id' => 3,
            ]
        );

        User::firstOrCreate(
            ['email' => 'sescalei1@gmail.com'],
            [
                'name' => 'Sandra Escaleira',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
                'shop_id' => 3,
            ]
        );

        User::firstOrCreate(
            ['email' => 'shaniece@jkdistro.com'],
            [
                'name' => 'Shaniece',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
                'shop_id' => 3,
            ]
        );

        User::firstOrCreate(
            ['email' => 'shawna@jkdistro.com'],
            [
                'name' => 'Shawna',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
                'shop_id' => 3,
            ]
        );

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
                'shop_id' => 3,
            ]
        );

        User::firstOrCreate(
            ['email' => 'info@jkdistro.com'],
            [
                'name' => '',
                'password' => Hash::make('euT-xNRkbbPsmTp@kevvj3g'),
                'shop_id' => 3,
            ]
        );
    }
}
