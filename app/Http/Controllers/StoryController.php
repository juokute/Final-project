<?php

namespace App\Http\Controllers;

use App\Models\HashTag;
use Illuminate\Http\Request;
use App\Models\Story;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Donation;

class StoryController extends Controller
{
    public function newStory()
    {
        $tags = HashTag::select('hash_tag')->distinct()->pluck('hash_tag');

        return Inertia::render('NewStory', [
            'storiesUrl' => route('get-stories'),
            'allTags' => $tags
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

        $userId = Auth::id();

        $stories = Story::with('hashTags')->get()->map(function ($story) use ($userId) {
            $totalDonated = DB::table('donations')->where('story_id', $story->id)->sum('donated_amount');
            $story->total_donated = $totalDonated;
            $story->percent = $story->required_amount > 0
                ? min(($totalDonated / $story->required_amount) * 100, 100)
                : 0;
            $story->recent_donations = DB::table('donations')
                ->join('users', 'donations.user_id', '=', 'users.id')
                ->where('donations.story_id', $story->id)
                ->select('users.name', 'donations.donated_amount as amount')
                ->orderBy('donations.id', 'desc')
                ->take(3)
                ->get();

            $story->heart_count = DB::table('hearts')->where('story_id', $story->id)->count();
            $story->hearted = $userId
                ? DB::table('hearts')->where('story_id', $story->id)->where('user_id', $userId)->exists()
                : false;
            return $story;
        });

        return response()->json([
            'stories' => $stories,
            'status' => 'ok'
        ]);
    }

    public function donate(Request $request, $id)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
        ]);

        Donation::create([
            'user_id' => Auth::id(),
            'story_id' => $id,
            'donated_amount' => $request->amount,
        ]);

        $story = Story::findOrFail($id);
        $totalDonated = Donation::where('story_id', $id)->sum('donated_amount');
        $percent = $story->required_amount > 0
            ? min(($totalDonated / $story->required_amount) * 100, 100)
            : 0;

        $recentDonations = DB::table('donations')
            ->join('users', 'donations.user_id', '=', 'users.id')
            ->where('donations.story_id', $id)
            ->select('users.name', 'donations.donated_amount as amount')
            ->orderBy('donations.id', 'desc')
            ->take(3)
            ->get();

        return response()->json([
            'total_donated' => $totalDonated,
            'percent' => $percent,
            'recent_donations' => $recentDonations,
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
            'hash_tags' => 'required|array|min:1',
            'hash_tags.*' => 'string|max:50',
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

        foreach ($request->hash_tags as $tag) {
            DB::table('hash_tags')->insert([
                'story_id' => $story->id,
                'hash_tag' => $tag,
            ]);
        }



        return redirect()
            ->route('home')
            ->with('success', 'Story created successfully!');
    }

    public function destroy($id)
    {
        $story = \App\Models\Story::findOrFail($id);
        $story->delete();

        return redirect()->back()->with('success', 'Story deleted!');
    }

    public function edit($id)
    {
        $story = Story::with('hashTags')->findOrFail($id);

        $tags = HashTag::select('hash_tag')->distinct()->pluck('hash_tag');

        return Inertia::render('EditStory', [
            'story' => $story,
            'allTags' => $tags,
        ]);
    }


    public function update(Request $request, $id)
    {
        $story = Story::findOrFail($id);

        // 🔒 apsauga (labai svarbu)
        if ($story->user_id !== Auth::id()) {
            abort(403);
        }

        // ✅ validacija
        $request->validate([
            'title' => 'required|string|max:255',
            'text' => 'required|string',
            'required_amount' => 'required|numeric|min:1',
            'title_photo' => 'nullable|image',
            'photos.*' => 'nullable|image',
            'hash_tags' => 'required|array|min:1',
            'hash_tags.*' => 'string|max:50',
        ]);

        if ($request->has('remove_title_photo')) {
            $story->title_photo = null;
        }

        // 📸 title photo update
        if ($request->hasFile('title_photo')) {
            $story->title_photo = $request->file('title_photo')->store('photos', 'public');
        }

        // 🔥 pasiimam tik tas, kurias frontend paliko
        $existingPhotos = [];

        if ($request->has('existing_photos')) {
            $existingPhotos = json_decode($request->input('existing_photos'), true) ?? [];
        }

        $photos = $existingPhotos;

        // ➕ pridedam naujas
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $photos[] = $photo->store('photos', 'public');
            }
        }

        // 🧠 update pagrindiniai duomenys
        $story->title = $request->title;
        $story->text = $request->text;
        $story->required_amount = $request->required_amount;
        $story->photos = $photos;

        $story->save();

        // 🏷️ atnaujinam tagus (ištrinam senus)
        DB::table('hash_tags')->where('story_id', $story->id)->delete();

        foreach ($request->hash_tags as $tag) {
            DB::table('hash_tags')->insert([
                'story_id' => $story->id,
                'hash_tag' => $tag,
            ]);
        }



        return redirect()
            ->route('home')
            ->with('success', 'Story updated successfully!');
    }

    public function show($id)
    {
        $story = Story::with('hashTags')->findOrFail($id);

        return Inertia::render('StoryPreview', [
            'story' => $story,
        ]);
    }


    public function toggleHeart(Request $request, $id)
    {
        $userId = Auth::id();

        $existing = DB::table('hearts')
            ->where('user_id', $userId)
            ->where('story_id', $id)
            ->first();

        if ($existing) {
            DB::table('hearts')
                ->where('user_id', $userId)
                ->where('story_id', $id)
                ->delete();
            $hearted = false;
        } else {
            DB::table('hearts')->insert([
                'user_id' => $userId,
                'story_id' => $id,
            ]);
            $hearted = true;
        }

        $count = DB::table('hearts')->where('story_id', $id)->count();

        return response()->json(['hearted' => $hearted, 'count' => $count]);
    }
}
