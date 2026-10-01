<?php

namespace Tests\Feature;

use Tests\TestCase;

class TaskListLayoutStylesTest extends TestCase
{
    public function test_filter_stays_with_the_task_list_heading(): void
    {
        $styles = file_get_contents(resource_path('css/app.css'));

        $this->assertStringContainsString('.task-toolbar { justify-content: flex-start;', $styles);
        $this->assertStringContainsString('.filter-control { align-items: center; display: flex;', $styles);
        $this->assertStringContainsString('.filter-control { display: grid; gap: 6px; width: 100%; }', $styles);
    }

    public function test_filter_has_no_visible_show_label(): void
    {
        $component = file_get_contents(resource_path('js/TaskTracker.tsx'));

        $this->assertStringNotContainsString('<span>Show</span>', $component);
        $this->assertStringContainsString('aria-label="Show tasks"', $component);
    }

    public function test_column_headers_use_a_dark_neutral_at_the_existing_size(): void
    {
        $styles = file_get_contents(resource_path('css/app.css'));

        $this->assertStringContainsString('color: #525252; font-size: 12px; font-weight: 600;', $styles);
    }

    public function test_priority_pills_give_their_color_markers_room_to_read(): void
    {
        $styles = file_get_contents(resource_path('css/app.css'));

        $this->assertStringContainsString('gap: 7px; line-height: 1.2; padding: 5px 10px;', $styles);
        $this->assertStringContainsString("height: 9px; width: 9px;", $styles);
        $this->assertStringContainsString('.badge-medium { --badge-dot: #facc15; }', $styles);
    }
}
