<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Project::all());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'url'         => 'nullable|url',
            'repo_url'    => 'nullable|url',
            'tech_stack'  => 'nullable|string',
            'image'       => 'nullable|image|max:2048', // max 2MB
        ]);

        if ($request->hasFile('image')) {
            // store in storage/app/public/projects
            $path = $request->file('image')->store('projects', 'public');
            $data['image_path'] = $path;
        }

        $project = Project::create($data);

        return response()->json($project, 201);
    }

    public function show(Project $project): JsonResponse
    {
        return response()->json($project);
    }

    public function update(Request $request, Project $project): JsonResponse
    {
        $data = $request->validate([
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'url'         => 'nullable|url',
            'repo_url'    => 'nullable|url',
            'tech_stack'  => 'nullable|string',
            'image'       => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // delete old if exists
            if ($project->image_path) {
                \Storage::disk('public')->delete($project->image_path);
            }
            $path = $request->file('image')->store('projects', 'public');
            $data['image_path'] = $path;
        }

        $project->update($data);

        return response()->json($project);
    }

    public function destroy(Project $project): JsonResponse
    {
        if ($project->image_path) {
            \Storage::disk('public')->delete($project->image_path);
        }
        $project->delete();
        return response()->json(null, 204);
    }
}
