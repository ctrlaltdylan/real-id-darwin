<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use GuzzleHttp\Client;



class Shop extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'api_key',
    ];

    public function users() {
      return $this->belongsToMany(User::class);
    }

    public function api() {
      $client = new Client([
        // Base URI is used with relative requests
        // you need to add a trailing slash to the base uri
        'base_uri' => env('REAL_ID_API_HOST') . '/api/',
        'headers' => [
          'Authorization' => 'Bearer ' . $this->api_key,
          'User-Agent' => 'Verdict Dashboard/1.0',
        ],
      ]);

      return $client;
    }
}
