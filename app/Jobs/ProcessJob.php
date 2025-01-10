<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\Middleware\RateLimited;
use DateTime;



class ProcessJob implements ShouldQueue
{
    use Queueable;

    /**
    * Create a new job instance.
     */
    public function __construct(public $path, public $data, public $queue, public $options)
    {
        //
        $this->path = $path;
        $this->data = $data;
        $this->queue = $queue;
        $this->options = $options;
    }

/**
 * Get the middleware the job should pass through.
 *
 * @return array<int, object>
 */ 
  public function middleware(): array
    {
        return [new RateLimited('jobs')];
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
    $client = new \GuzzleHttp\Client();
    $host = $this->options['host'] ?? env('REAL_ID_API_HOST');
    $response = $client->request('POST', $host . $this->path, [
        'json' => $this->data,
    ]);

    if ($response->getStatusCode() == 200) {
        // Handle successful response
        $responseData = json_decode($response->getBody(), true);
        // Process the response data if needed
    } else {
        // Handle error response
        \Log::error('Failed to make request to REAL_ID_API_HOST', [
            'status' => $response->getStatusCode(),
            'response' => $response->getBody()->getContents(),
        ]);
    }
    }

  /**
   * Determine the time at which the job should timeout.
   */
  public function retryUntil(): DateTime
  {
      return now()->addSeconds(5);
  }

}
