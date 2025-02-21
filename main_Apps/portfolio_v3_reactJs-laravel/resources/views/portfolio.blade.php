<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio</title>
</head>
<body>
    <h1>My Portfolio</h1>
    @foreach ($portfolios as $item)
        <div>
            <h2>{{ $item->title }}</h2>
            <p>{{ $item->description }}</p>
            @if($item->image)
                <img src="{{ asset($item->image) }}" alt="{{ $item->title }}">
            @endif
        </div>
    @endforeach
</body>
</html>
