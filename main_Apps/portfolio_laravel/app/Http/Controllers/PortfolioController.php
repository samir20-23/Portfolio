<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PortfolioService;

class PortfolioController extends Controller
{
    protected $portfolioService;

    public function __construct(PortfolioService $portfolioService)
    {
        $this->portfolioService = $portfolioService;
    }
 
    public function index()
    {
        $data = $this->portfolioService->getPortfolioData();
        return view('portfolio.index', $data);
    }
    
 
    public function getData()
    {
        $data = $this->portfolioService->getPortfolioData();
        return response()->json($data);
    }
}
