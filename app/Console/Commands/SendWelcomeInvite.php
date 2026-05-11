<?php

namespace App\Console\Commands;

use App\Mail\WelcomeInvite;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendWelcomeInvite extends Command
{
    protected $signature = 'user:invite {email : Email address of the user to invite}';

    protected $description = 'Send a welcome email with a set-password link to an existing user';

    public function handle(): int
    {
        $email = $this->argument('email');
        $user = User::firstWhere('email', $email);

        if (!$user) {
            $this->error("No user found with email {$email}");
            return self::FAILURE;
        }

        Mail::to($user->email)->send(new WelcomeInvite($user));

        $this->info("Welcome invite sent to {$user->email}");
        return self::SUCCESS;
    }
}
