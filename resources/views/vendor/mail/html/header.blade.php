@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
<img src="https://res.cloudinary.com/tinyhouse/image/upload/w_200/v1625170204/Real%20ID/Screen_Shot_2020-09-17_at_5.38.59_PM_1.png" class="logo" alt="Real ID">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
