<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class EntryController extends Controller
{
    public function helloEntry()
    {
        return Inertia::render('HelloEntry', ['number' => 'No 7']);
    }

    public function helloOldEntry() 
    {
        return view('hello_entry', ['number' => 'No 7']);
    }
}
