<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      $role = Role::firstOrCreate(['name' => 'superadmin']);
      $allChecksRead = Permission::firstOrCreate(['name' => 'checks:read']);
      $allShopsRead = Permission::firstOrCreate(['name' => 'shops:read']);

      $role->givePermissionTo($allChecksRead);
      $role->givePermissionTo($allShopsRead);

      $dylan = User::firstOrCreate(['email' => 'dylan@getverdict.com'], [
        'name' => 'Dylan',
        'password' => Hash::make('password'),
      ]);

      $dylan->assignRole('superadmin');
      $dylan->save();
    }
}
