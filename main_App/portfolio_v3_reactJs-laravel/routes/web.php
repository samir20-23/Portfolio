<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PortfolioController; 
use App\Models\Portfolio;

Route::get('/portfolio', function () {
    return response()->json(Portfolio::all(), 200, [
        "Access-Control-Allow-Origin" => "*",
        "Access-Control-Allow-Methods" => "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers" => "Content-Type, Authorization"
    ]);
});
