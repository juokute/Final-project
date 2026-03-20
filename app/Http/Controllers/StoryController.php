<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Story;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StoryController extends Controller
{
    public function newStory()
    {
        return Inertia::render('NewStory', [
            'storiesUrl' => route('get-stories')
        ]);
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
        sleep(2);

        // $stories = Story::all();
        $stories = Story::with('hashTags')->get();

        return response()->json([
            'stories' => $stories,
            'status' => 'ok'
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'text' => 'required|string',
            'required_amount' => 'required|numeric|min:1',
            'title_photo' => 'required|image',
            'photos.*' => 'nullable|image',
            'hash_tag' => 'required|string',
        ]);

        $photos = [];

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $photos[] = $photo->store('photos', 'public');
            }
        }

        $story = Story::create([
            'title' => $request->title,
            'text' => $request->text,
            'required_amount' => $request->required_amount,
            'title_photo' => $request->file('title_photo')?->store('photos', 'public'),
            'photos' => $photos, // vėliau apdoroti
            'user_id' => Auth::id(),
        ]);

        $tags = explode(' ', $request->hash_tag);

        foreach ($tags as $tag) {
            if (!empty($tag)) {
                DB::table('hash_tags')->insert([
                    'story_id' => $story->id,
                    'hash_tag' => $tag,
                ]);
            }
        }


        return redirect()
            ->route('home')
            ->with('success', 'Story created successfully!');
    }
}
