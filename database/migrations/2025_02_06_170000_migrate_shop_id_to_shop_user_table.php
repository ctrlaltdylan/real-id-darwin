<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

class MigrateShopIdToShopUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Get all users with shop_id
        $users = User::whereNotNull('shop_id')->get();

        // Create entries in shop_user table
        foreach ($users as $user) {
            DB::table('shop_user')->insert([
                'user_id' => $user->id,
                'shop_id' => $user->shop_id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Remove shop_id column from users table
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('shop_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Add shop_id column back to users table
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('shop_id')->nullable()->constrained()->onDelete('set null');
        });

        // Get all relationships from shop_user table
        $relationships = DB::table('shop_user')->get();

        // Restore shop_id for each user
        foreach ($relationships as $relation) {
            DB::table('users')
                ->where('id', $relation->user_id)
                ->update(['shop_id' => $relation->shop_id]);
        }
    }
} 