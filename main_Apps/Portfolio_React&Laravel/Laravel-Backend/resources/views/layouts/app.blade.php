<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- Custom Styles -->
    <style>
        :root {
            --primary-color: #6366f1;
            --primary-dark: #4f46e5;
            --secondary-color: #f8fafc;
            --text-primary: #1e293b;
            --text-secondary: #64748b;
            --border-color: #e2e8f0;
            --success-color: #10b981;
            --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            color: var(--text-primary);
            line-height: 1.6;
            min-height: 100vh;
        }

        /* Enhanced Navbar */
        .navbar-custom {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--border-color);
            box-shadow: var(--shadow-sm);
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        .navbar-brand {
            font-weight: 700;
            font-size: 1.5rem;
            color: var(--primary-color) !important;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .navbar-brand:hover {
            color: var(--primary-dark) !important;
            transform: translateY(-1px);
            transition: all 0.2s ease;
        }

        .lockscreen-logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-left: 2rem;
        }

        .lockscreen-logo img {
            border-radius: 8px;
            box-shadow: var(--shadow-sm);
        }

        .lockscreen-logo a {
            text-decoration: none;
            color: var(--text-primary);
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        /* Navigation Links */
        .navbar-nav .nav-link {
            color: var(--text-secondary) !important;
            font-weight: 500;
            padding: 0.5rem 1rem !important;
            border-radius: 8px;
            transition: all 0.2s ease;
            position: relative;
        }

        .navbar-nav .nav-link:hover {
            color: var(--primary-color) !important;
            background-color: rgba(99, 102, 241, 0.1);
            transform: translateY(-1px);
        }

        .navbar-nav .nav-link::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background: var(--primary-color);
            transition: all 0.2s ease;
            transform: translateX(-50%);
        }

        .navbar-nav .nav-link:hover::before {
            width: 80%;
        }

        /* Dropdown Menu */
        .dropdown-menu {
            border: none;
            box-shadow: var(--shadow-lg);
            border-radius: 12px;
            padding: 0.5rem;
            margin-top: 0.5rem;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
        }

        .dropdown-item {
            border-radius: 8px;
            padding: 0.75rem 1rem;
            font-weight: 500;
            color: var(--text-secondary);
            transition: all 0.2s ease;
        }

        .dropdown-item:hover {
            background-color: var(--primary-color);
            color: white;
            transform: translateX(4px);
        }

        .dropdown-toggle::after {
            margin-left: 0.5rem;
            transition: transform 0.2s ease;
        }

        .dropdown-toggle[aria-expanded="true"]::after {
            transform: rotate(180deg);
        }

        /* User Avatar */
        .user-avatar {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 0.875rem;
            margin-right: 0.5rem;
        }

        /* Main Container */
        .main-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
        }

        /* Alert Enhancements */
        .alert-custom {
            border: none;
            border-radius: 12px;
            padding: 1rem 1.5rem;
            margin-bottom: 2rem;
            box-shadow: var(--shadow-sm);
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .alert-success-custom {
            background: linear-gradient(135deg, #ecfdf5, #d1fae5);
            color: #065f46;
            border-left: 4px solid var(--success-color);
        }

        .alert-icon {
            font-size: 1.25rem;
            opacity: 0.8;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .lockscreen-logo {
                display: none;
            }

            .navbar-brand {
                font-size: 1.25rem;
            }

            .main-container {
                padding: 1rem;
            }
        }

        /* Loading Animation */
        .navbar-toggler {
            border: none;
            padding: 0.5rem;
            border-radius: 8px;
            transition: all 0.2s ease;
        }

        .navbar-toggler:hover {
            background-color: rgba(99, 102, 241, 0.1);
        }

        .navbar-toggler:focus {
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }

        /* Content Area */
        .content-wrapper {
            background: white;
            border-radius: 16px;
            box-shadow: var(--shadow-sm);
            padding: 2rem;
            margin-top: 1rem;
            border: 1px solid var(--border-color);
        }

        /* Utility Classes */
        .text-gradient {
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .btn-primary-custom {
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
            border: none;
            border-radius: 8px;
            padding: 0.75rem 1.5rem;
            font-weight: 600;
            transition: all 0.2s ease;
            box-shadow: var(--shadow-sm);
        }

        .btn-primary-custom:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
        }


        @keyframes logoPulse {

            0%,
            100% {
                transform: scale(1) rotate(2deg);
            }

            50% {
                transform: scale(1.05) rotate(-2deg);
                ;
            }
        }

        .img-logo {
            box-shadow: none;
            animation: logoPulse 4s ease-in-out infinite;
        }
    </style>
</head>

<body>
    <!-- Enhanced Navigation -->
    <nav class="navbar navbar-expand-lg navbar-custom">
        <div class="container">
            <!-- Brand -->


            <!-- Logo Section -->
            <div class="lockscreen-logo d-none d-md-flex">
                <a href="{{ route('dashboard') }}">
                    <i class="bi bi-lightning-charge-fill"></i>
                    @if (config('adminlte.logo_img'))
                        <img src="{{ asset(config('adminlte.logo_img')) }}" height="40" alt="Logo"
                            class="img-logo">
                    @endif
                    <span class="text-gradient">{!! config('adminlte.logo', '<b>Admin</b>Panel') !!}</span>
                </a>
            </div>

            <!-- Mobile Toggle -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <i class="bi bi-list"></i>
            </button>

            <!-- Navigation Menu -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    @guest
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('login') }}">
                                <i class="bi bi-box-arrow-in-right me-1"></i>
                                Login
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('register') }}">
                                <i class="bi bi-person-plus me-1"></i>
                                Register
                            </a>
                        </li>
                    @else
                        <li class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle d-flex align-items-center" href="#"
                                role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <div class="user-avatar">
                                    {{ strtoupper(substr(Auth::user()->name, 0, 1)) }}
                                </div>
                                <span>{{ Auth::user()->name }}</span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <i class="bi bi-person me-2"></i>
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <i class="bi bi-gear me-2"></i>
                                        Settings
                                    </a>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                        onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                                        <i class="bi bi-box-arrow-right me-2"></i>
                                        Logout
                                    </a>
                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                        @csrf
                                    </form>
                                </li>
                            </ul>
                        </li>
                    @endguest
                </ul>
            </div>
        </div>
    </nav>

    <!-- Main Content Area -->
    <div class="main-container">

        <!-- Success Messages -->
        @if (session('success'))
            <div class="alert alert-custom alert-success-custom" role="alert">
                <i class="bi bi-check-circle-fill alert-icon"></i>
                <div>
                    <strong>Success!</strong> {{ session('success') }}
                </div>
            </div>
        @endif

        <!-- Error Messages -->
        @if (session('error'))
            <div class="alert alert-custom"
                style="background: linear-gradient(135deg, #fef2f2, #fecaca); color: #991b1b; border-left: 4px solid #ef4444;"
                role="alert">
                <i class="bi bi-exclamation-triangle-fill alert-icon"></i>
                <div>
                    <strong>Error!</strong> {{ session('error') }}
                </div>
            </div>
        @endif

        <!-- Content Wrapper -->
        <div class="content-wrapper">
            @yield('content')
        </div>
    </div>

    <!-- Footer -->
    <footer class="text-center py-4 mt-5">
        <div class="container">
            <p class="text-muted mb-0">
                &copy; {{ date('Y') }} {{ config('app.name', 'Laravel') }}.
                <span class="text-gradient">Built with ❤️</span>
            </p>
        </div>
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Custom JavaScript -->
    <script>
        // Auto-hide alerts after 5 seconds
        document.addEventListener('DOMContentLoaded', function() {
            const alerts = document.querySelectorAll('.alert-custom');
            alerts.forEach(function(alert) {
                setTimeout(function() {
                    alert.style.opacity = '0';
                    alert.style.transform = 'translateY(-20px)';
                    setTimeout(function() {
                        alert.remove();
                    }, 300);
                }, 5000);
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    </script>
</body>

</html>
