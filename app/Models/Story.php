<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    protected $table = 'stories';

    // Stulpeliai, su kuriais dirbsi Laravel pusėje
    protected $fillable = [
        'text',
        'title_photo',
        'photos',
        'required_amount',
        'user_id',
    ];
}