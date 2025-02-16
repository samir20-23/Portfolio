<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Contact;
use App\Models\Experience;
use App\Models\Education;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Language;

class PortfolioSeeder extends Seeder
{
    public function run()
    {
        // Insert Contact Information
        Contact::create([
            'name'      => 'Samir Aoulad Amar',
            'position'  => 'Full-Stack Developer',
            'phone'     => '+212 718087106',
            'email'     => 'aouladamarsamir@gmail.com',
            'location'  => 'Bni Ouriaghel, TANGER',
            'languages' => 'Arabe (Maternelle), Anglais (Notion De Base), Francais (Niveau Scolaire)',
        ]);

        // Insert Experience
        Experience::create([
            'title'       => 'Stage: Développeur Backend - Projet E-commerce Markotincom',
            'company'     => 'ATC, Medina, Tanger',
            'description' => 'Gestion de bases de données MySQL, Intégration de passerelles de paiement et optimisation de l\'expérience utilisateur. Étude de projet : Plateforme e-commerce "Markotincom". Backend: MySQL, Intégration de passerelles de paiement, PHP, MVC. Tools: PhpStorm, PhpMyAdmin, Git, Github, Trello',
            'start_date'  => '2024-06-20',
            'end_date'    => '2024-07-20',
            'location'    => 'Medina, Tanger',
        ]);

        // Insert Education
        Education::create([
            'title'       => 'CENTRE SOLIDAIRE DIGITAL - SOLICODE - TANGER',
            'institution' => 'Mode bootcamp — développement web',
            'description' => 'Formation axée sur l’autonomie, le dynamisme, l’esprit d’équipe, la motivation, la créativité et l’adaptabilité.',
            'year'        => '2023',
        ]);

        // Insert Projects
        Project::create([
            'title'       => 'Application Web Full-Stack pour Livraison de nourriture (FOOD DELIVERY)',
            'description' => 'Backend: MySQL, PHP, MVC. FrontEnd: Tailwind, JavaScript. Tools: PhpStorm, PhpMyAdmin, Git, Github, Trello',
            'backend'     => 'MySQL, PHP, MVC',
            'frontend'    => 'Tailwind, JavaScript',
            'tools'       => 'PhpStorm, PhpMyAdmin, Git, Github, Trello',
            'link'        => '', // Optionally add a live link
        ]);

        Project::create([
            'title'       => 'Application Web Front-End – Intégration d\'API de Films',
            'description' => 'FrontEnd: Tailwind, JavaScript, AJAX, React Js. Tools: VsCode, Git, Github, Trello',
            'backend'     => '',
            'frontend'    => 'Tailwind, JavaScript, AJAX, React Js',
            'tools'       => 'VsCode, Git, Github, Trello',
            'link'        => '', // Optionally add a live link
        ]);

        // Insert Skills
        // Front-end Skills
        Skill::create([
            'category' => 'Front-end',
            'skills'   => 'JAVASCRIPT, React Js, BOOTSTRAP, Tailwind CSS, AJAX, HTML & CSS, Git et GitHub',
        ]);
        // Mobile Skills
        Skill::create([
            'category' => 'Mobile',
            'skills'   => 'Kotlin, Jetpack Compose',
        ]);
        // Design Skills
        Skill::create([
            'category' => 'Design',
            'skills'   => 'Figma, Canva, Justinmind',
        ]);
        // Tools & Other Skills
        Skill::create([
            'category' => 'Tools',
            'skills'   => 'Github, Git, Linux, Kali Linux, VsCode, Workbench, Intellij IDE, Android Studio, PhpStorm, PhpMyAdmin, Trello',
        ]);
        // Back-end Skills
        Skill::create([
            'category' => 'Back-end',
            'skills'   => 'PHP, Laravel, SQL / MySQL',
        ]);

        // Insert Languages (Programming / Spoken)
        Language::create([
            'language'    => 'Arabe',
            'proficiency' => 'Maternelle',
        ]);
        Language::create([
            'language'    => 'Anglais',
            'proficiency' => 'Notion De Base',
        ]);
        Language::create([
            'language'    => 'Francais',
            'proficiency' => 'Niveau Scolaire',
        ]);
    }
}
