<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Samir Aoulad Amar Portfolio</title>
    <!-- If using Vite (Laravel 9+): -->
    @vite('resources/css/app.css')
    <!-- Otherwise, if using Laravel Mix, use the asset helper: -->
    <!-- <link rel="stylesheet" href="{{ asset('css/app.css') }}"-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
    <style>
        :root {
            /* Main Background Colors */
            --bg-primary: #2c2c40;
            --bg-secondary: #13131f;
            --bg-tertiary: #1c1c2b;

            /* Surface Colors */
            --surface-1: #1e1e2d;
            --surface-2: #252537;
            --surface-3: #2c2c40;

            /* Purple Accent Colors */
            --accent-primary: #8b5cf6;
            /* Main purple */
            --accent-secondary: #581fbadf;
            /* Darker purple */
            --accent-tertiary: #a78bfa;
            /* Lighter purple */

            /* Gradient Colors */
            --gradient-1: linear-gradient(135deg, #451f9ed0, #6d28d9);
            --gradient-2: linear-gradient(45deg, #4f1baae5, #4c1d95);
            --gradient-3: linear-gradient(to right, #5c78f6da, #6d28d9, #4c1d95);

            /* Text Colors */
            --text-primary: #ffffff;
            --text-secondary: #9ca3af;
            --text-tertiary: #6b7280;

            /* Border Colors */
            --border-light: rgba(139, 92, 246, 0.1);
            --border-medium: rgba(139, 92, 246, 0.2);
            --border-heavy: rgba(139, 92, 246, 0.3);

            /* Shadow Colors */
            --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
            --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
            --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
            --shadow-glow: 0 0 15px rgba(139, 92, 246, 0.3);

            /* Special Effect Colors */
            --hover-overlay: rgba(139, 92, 246, 0.1);
            --active-overlay: rgba(139, 92, 246, 0.2);
            --card-gradient: linear-gradient(145deg, rgba(139, 92, 246, 0.1), rgba(0, 0, 0, 0));

            /* Status Colors */
            --success: #10b981;
            --warning: #f59e0b;
            --error: #ef4444;
            --info: #3b82f6; 
        }

        /* Dark theme base styles */
        body {
            background-color: var(--bg-primary);
            color: var(--text-primary);
        }

        header {
            background-color: var(--bg-secondary);
            border-bottom: 1px solid var(--border-light);
        }

        nav ul li a {
            color: var(--text-secondary);
        }

        nav ul li a:hover {
            color: var(--accent-primary);
        }

        /* Project Cards */
        #projects .grid>div {
            background: var(--surface-1);
            border: 1px solid var(--border-medium);
            box-shadow: var(--shadow-sm);
        }

        #projects .grid>div:hover {
            border-color: var(--accent-primary);
            box-shadow: var(--shadow-glow);
            background: var(--card-gradient);
        }

        /* Experience Section */
        #experience .bg-white {
            background-color: var(--surface-2);
            border: 1px solid var(--border-light);
        }

        /* Contact Section */
        #contact {
            background: var(--gradient-1);
        }

        /* Social Icons */
        .fab {
            color: var(--text-secondary);
        }

        .fab:hover {
            color: var(--accent-primary);
        }

        /* Links */
        a {
            color: var(--accent-tertiary);
            transition: color 0.3s ease;
        }

        a:hover {
            color: var(--accent-primary);
        }

        /* Button Styles */
        .button {
            background: var(--gradient-2);
            color: var(--text-primary);
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            transition: all 0.3s ease;
        }

        .button:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-glow);
        }

        /* Scroll Progress Bar */
        .scroll-progress {
            background: var(--gradient-3);
        }

        /* Glass Effect */
        .glass {
            background: rgba(28, 28, 43, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid var(--border-light);
        }
    </style>
</head>

<body class="bg-gray-100 text-gray-800">
    <!-- Navigation -->
    <header class="shadow">
        <div class="container mx-auto px-4 py-6 flex justify-between items-center">
            <div class="text-2xl font-bold">Samir Aoulad Amar</div>
            <nav>
                <ul class="flex space-x-4">
                    <li><a href="#about" class="hover:text-blue-500">About</a></li>
                    <li><a href="#projects" class="hover:text-blue-500">Projects</a></li>
                    <li><a href="#experience" class="hover:text-blue-500">Experience</a></li>
                    <li><a href="#contact" class="hover:text-blue-500">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->
    <section id="hero" class="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <!-- Replace with your own image path -->
        <img src="{{ asset('images/profile.jpg') }}" alt="Profile" class="w-32 h-32 rounded-full mb-4" />
        <h1 class="text-4xl font-bold mb-2">Hi, I'm Samir Aoulad Amar</h1>
        <p class="text-xl mb-4">Full-Stack Developer & Designer</p>
        <p class="max-w-xl">I create dynamic web applications and beautiful user interfaces with a focus on performance
            and design.</p>
    </section>

    <!-- Projects Section -->
    <section id="projects" class=" py-20">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">My Projects</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                @foreach ($projects as $project)
                    <div class="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h3 class="text-xl font-semibold mb-2">{{ $project->title }}</h3>
                        <p class="mb-4">{{ $project->description }}</p>
                        <p class="text-sm text-gray-600"><strong>Backend:</strong> {{ $project->backend }}</p>
                        <p class="text-sm text-gray-600"><strong>Frontend:</strong> {{ $project->frontend }}</p>
                        <p class="text-sm text-gray-600"><strong>Tools:</strong> {{ $project->tools }}</p>
                        @if ($project->link)
                            <a href="{{ $project->link }}" target="_blank"
                                class="text-blue-500 hover:underline mt-4 block">View Project</a>
                        @endif
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="container mx-auto px-4 py-20">
        <h2 class="text-3xl font-bold text-center mb-12">Experience</h2>
        <div class="space-y-8">
            @foreach ($experiences as $exp)
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-xl font-semibold">{{ $exp->title }}</h3>
                    <p class="text-gray-600">{{ $exp->company }} | {{ $exp->location }}</p>
                    <p class="mt-2">{{ $exp->description }}</p>
                    <p class="text-sm text-gray-500 mt-2">From: {{ $exp->start_date }} To: {{ $exp->end_date }}</p>
                </div>
            @endforeach
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="  py-20">
        <div class="container mx-auto px-4 text-center text-white">
            <h2 class="text-3xl font-bold mb-4">Get In Touch</h2>
            <p class="mb-8">I’d love to hear from you! Feel free to drop a message if you have any questions or
                opportunities.</p>
            <div>
                <p>Email: {{ $contact->email }}</p>
                <p>Phone: {{ $contact->phone }}</p>
                <p>Location: {{ $contact->location }}</p>
            </div>
            <div class="mt-6">
                <a target="_blank" href="https://www.linkedin.com/in/samir-aoulad-amar-a238a9334/" class="mx-2"><i
                        class="fab fa-linkedin text-2xl"></i></a>
                <a target="_blank" href="https://github.com/samir20-23" class="mx-2"><i
                        class="fab fa-github text-2xl"></i></a>
                <a target="_blank" href="https://x.com/Samir_Germany1" class="mx-2"><i
                        class="fab fa-twitter text-2xl"></i></a>
                <a target="_blank" href="https://www.instagram.com/samir_devgenius/" class="mx-2"><i
                        class="fab fa-instagram text-2xl"></i></a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="  text-white py-6">
        <div class="container mx-auto px-4 text-center">
            <p>&copy; {{ date('Y') }} Samir Aoulad Amar. All rights reserved.</p>
        </div>
    </footer>
</body>

</html>
