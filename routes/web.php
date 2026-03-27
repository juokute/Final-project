<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EntryController as E;
use App\Http\Controllers\StoryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



ROUTE::get('/old-entry', [E::class, 'helloOldEntry']);
ROUTE::get('/get-entries', [E::class, 'getEntries'])->name('get-entries');
Route::get('/api/stories', [StoryController::class, 'getStories'])->name('api.stories'); // Axios duomenims


ROUTE::get('/get-stories', [StoryController::class, 'getStories'])->name('get-stories');

Route::get('/home', [StoryController::class, 'index'])->name('home');
Route::get('/story', [StoryController::class, 'newStory'])
    ->middleware('auth')
    ->name('story');
Route::get('/stories/{id}', [StoryController::class, 'show'])->name('stories.show');
Route::post('/stories', [StoryController::class, 'store'])->name('stories.store');
Route::delete('/stories/{id}', [StoryController::class, 'destroy'])->name('stories.destroy');
Route::put('/stories/{id}', [StoryController::class, 'update'])->name('stories.update');
Route::get('/stories/{id}/edit', [StoryController::class, 'edit'])->name('stories.edit');
Route::post('/stories/{id}/heart', [StoryController::class, 'toggleHeart'])
    ->middleware('auth')
    ->name('stories.heart');
Route::post('/stories/{id}/donate', [StoryController::class, 'donate'])
    ->middleware('auth')
    ->name('stories.donate');
Route::get('/stories/{id}/donations', [StoryController::class, 'getDonations'])->name('stories.donations');
Route::get('/stories/{id}/donations/top', [StoryController::class, 'getTopDonors'])->name('stories.donations.top');


Route::middleware('auth')->group(function () {
    // ... esami route'ai ...
    Route::put('/stories/{id}/tags', [StoryController::class, 'updateStoryTags'])->name('stories.tags.update');
});



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/admin', [StoryController::class, 'adminPanel'])->name('admin');
    Route::post('/stories/{id}/approve', [StoryController::class, 'approveStory'])->name('stories.approve');
    Route::post('/stories/{id}/reject', [StoryController::class, 'rejectStory'])->name('stories.reject');
    Route::post('/admin/tags', [StoryController::class, 'storeTag'])->name('admin.tags.store');
    Route::delete('/admin/tags', [StoryController::class, 'destroyTag'])->name('admin.tags.destroy');
});




Route::get('/profile', [ProfileController::class, 'edit'])
    ->middleware('auth')
    ->name('profile.edit');
Route::patch('/profile', [ProfileController::class, 'update'])
    ->middleware('auth')
    ->name('profile.update');
Route::delete('/profile', [ProfileController::class, 'destroy'])
    ->middleware('auth')
    ->name('profile.destroy');



require __DIR__ . '/auth.php';
