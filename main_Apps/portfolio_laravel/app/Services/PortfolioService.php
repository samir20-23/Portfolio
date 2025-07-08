<?php

namespace App\Services;

use App\Models\Contact;
use App\Models\Project;
use App\Models\Experience;
use App\Models\Education;
use App\Models\Skill;
use App\Models\Language;

class PortfolioService
{
    public function getPortfolioData()
    {
        $contact     = Contact::first();
        $projects    = Project::all();
        $experiences = Experience::all();
        $educations  = Education::all();
        $skills      = Skill::all();
        $languages   = Language::all();

        return compact('contact', 'projects', 'experiences', 'educations', 'skills', 'languages');
    }
}
