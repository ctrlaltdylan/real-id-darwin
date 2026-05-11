<x-mail::message>
# Welcome to Real ID, {{ $name }}

An account has been created for you on Real ID. To get started, set your password using the link below.

<x-mail::button :url="$setPasswordUrl">
Set your password
</x-mail::button>

This link will expire after a short period. If you weren't expecting this invitation, you can safely ignore this email.

Thanks,<br>
The Real ID team
</x-mail::message>
