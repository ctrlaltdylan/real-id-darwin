<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\URL;

class WelcomeInvite extends Mailable
{
    use Queueable, SerializesModels;

    public string $setPasswordUrl;

    public function __construct(public User $user)
    {
        $token = Password::broker()->createToken($user);

        $this->setPasswordUrl = URL::route('password.reset', [
            'token' => $token,
            'email' => $user->email,
        ]);
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Welcome to Real ID — set your password',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.welcome-invite',
            with: [
                'name' => $this->user->name,
                'setPasswordUrl' => $this->setPasswordUrl,
            ],
        );
    }
}
