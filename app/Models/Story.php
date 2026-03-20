<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\HashTag;

class Story extends Model
{
    protected $table = 'stories';

    // Stulpeliai, su kuriais dirbsi Laravel pusėje
    protected $fillable = [
        'title',
        'text',
        'title_photo',
        'photos',
        'required_amount',
        'user_id',
    ];

    protected $casts = [
        'photos' => 'array',
    ];

    public function hashTags()
{
    return $this->hasMany(HashTag::class);
}
}
