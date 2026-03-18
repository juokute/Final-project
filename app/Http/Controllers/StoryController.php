<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Story;
use Inertia\Inertia;

class StoryController extends Controller
{
    public function newStory()  
    {
        return Inertia::render('NewStory');
    } 

    public function index()
    {
        $stories = Story::all(); // gauni visus stulpelius
        return Inertia::render('HelloEntry', [
            'entriesUrl' => route('get-stories'), // pavadinimas kaip tavo React props
        ]);
    }

     public function getStories()
    {
        $stories = Story::all();
        return response()->json([
            'entries' => $stories,
        ]);
    }
}
