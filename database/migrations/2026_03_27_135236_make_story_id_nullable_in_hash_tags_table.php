<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        DB::statement('ALTER TABLE hash_tags DROP FOREIGN KEY hash_tags_ibfk_1');
        DB::statement('ALTER TABLE hash_tags MODIFY COLUMN story_id BIGINT UNSIGNED NULL');
    }

    public function down()
    {
        DB::statement('ALTER TABLE hash_tags MODIFY COLUMN story_id BIGINT UNSIGNED NOT NULL');
        DB::statement('ALTER TABLE hash_tags ADD CONSTRAINT hash_tags_ibfk_1 FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE');
    }
};
