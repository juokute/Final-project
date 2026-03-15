<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class EntryController extends Controller
{
    public function helloEntry()
    {
        return Inertia::render('HelloEntry', [
            'number' => 'No 7',
            'entriesUrl' => route('get-entries')
            ]);
    }

    public function helloOldEntry()
    {
        return view('hello_entry', [
            'number' => 'No 7'
            ]);
    }

    public function getEntries()
    {
        sleep(3);

        $entries = [];

        return response()->json([
            'entries' => $entries, 
            'status' => 'ok'
            ]);
    }


            // public function addLike()
            // {
            // let likes=document.getElementById("likes");
            // likes.innerText=parseInt(likes.innerText)+1;
            // }

}
