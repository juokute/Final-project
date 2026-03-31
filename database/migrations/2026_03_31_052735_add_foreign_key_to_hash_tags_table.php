<?php

// use Astro\Note\Models\DB;
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
    DB::statement('ALTER TABLE hash_tags MODIFY COLUMN story_id MEDIUMINT(9) NULL');
    DB::statement('ALTER TABLE hash_tags ADD CONSTRAINT hash_tags_story_id_foreign FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE');
}

    /**
     * Reverse the migrations.
     */
    public function down()
{
    DB::statement('ALTER TABLE hash_tags DROP FOREIGN KEY hash_tags_story_id_foreign');
    DB::statement('ALTER TABLE hash_tags MODIFY COLUMN story_id BIGINT UNSIGNED NULL');
}
};
