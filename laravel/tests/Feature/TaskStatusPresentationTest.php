<?php

namespace Tests\Feature;

use Tests\TestCase;

class TaskStatusPresentationTest extends TestCase
{
    public function test_status_is_the_filled_signal_while_priority_uses_colored_dots(): void
    {
        $component = file_get_contents(resource_path('js/TaskTracker.tsx'));
        $styles = file_get_contents(resource_path('css/app.css'));

        $this->assertStringContainsString('className={`status status-${task.status}`}', $component);
        $this->assertMatchesRegularExpression("/task\.status === 'completed' \? <path d=\"m5 12 4 4L19 6\"/", $component);
        $this->assertMatchesRegularExpression("/: <>\s*<circle cx=\"12\" cy=\"12\" r=\"7\"/", $component);
        $this->assertStringContainsString('.status-completed { background: #dcfae6; color: var(--success); }', $styles);
        $this->assertStringContainsString('.status-pending { background: #fff3d6; color: #a15c00; }', $styles);
        $this->assertStringContainsString('.badge { align-items: center; background: var(--paper);', $styles);
        $this->assertStringContainsString('.badge::before { background: var(--badge-dot);', $styles);
        $this->assertStringContainsString('.badge-high { --badge-dot: #c13245; }', $styles);
        $this->assertStringContainsString('.badge-medium { --badge-dot: #facc15; }', $styles);
        $this->assertStringContainsString('.badge-low { --badge-dot: var(--success); }', $styles);
        $this->assertStringContainsString('.task-table-wrap th:nth-child(2), .task-table-wrap td:nth-child(2) { width: 18%; }', $styles);
        $this->assertStringContainsString('.task-table-wrap th:nth-child(3), .task-table-wrap td:nth-child(3) { width: 12%; }', $styles);
        $this->assertStringContainsString('.task-table-wrap th:nth-child(5), .task-table-wrap td:nth-child(5) { width: 14%; }', $styles);
    }
}
