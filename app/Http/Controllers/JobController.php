<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Jobs\ProcessJob;

class JobController extends Controller
{
    public function store(Request $request)
    {
        $authorizationHeader = $request->header('Authorization');
        $expectedSecret = 'Bearer ' . env('REAL_ID_WORKER_SECRET');

        if ($authorizationHeader !== $expectedSecret) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $data = $request->all();
        $job = new ProcessJob($data['path'], $data['data'], $data['queue'], $data['options']);
        
        if (isset($data['options']['delay'])) {
            $delay = $data['options']['delay'];
            $delayInSeconds = 0;

            if (str_ends_with($delay, 'd')) {
                $delayInSeconds = (int)$delay * 86400;
            } elseif (str_ends_with($delay, 'h')) {
                $delayInSeconds = (int)$delay * 3600;
            } elseif (str_ends_with($delay, 'm')) {
                $delayInSeconds = (int)$delay * 60;
            } elseif (str_ends_with($delay, 's')) {
                $delayInSeconds = (int)$delay;
            }

            ProcessJob::dispatch($job)->delay($delayInSeconds);
        } else {
            ProcessJob::dispatch($job);
        }

        return response()->json(['message' => 'Job queued successfully']);
    }
}
