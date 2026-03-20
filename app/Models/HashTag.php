<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Story;

class HashTag extends Model
{
    use HasFactory;

    protected $table = 'hash_tags';

    public $timestamps = false;

    protected $fillable = [
        'story_id',
        'hash_tag',
    ];

    public function story()
    {
        return $this->belongsTo(Story::class);
    }
}
