<?php

use PHPUnit\Framework\TestCase;

require_once dirname(__DIR__) . '/src/TaskSorter.php';

class TaskSorterTest extends TestCase
{
    public function testSortsTasksByPriority(): void
    {
        $tasks = [
            ['title' => 'Low task', 'priority' => 'low', 'created_at' => '2026-09-01 09:00:00'],
            ['title' => 'High task', 'priority' => 'high', 'created_at' => '2026-09-03 09:00:00'],
            ['title' => 'Medium task', 'priority' => 'medium', 'created_at' => '2026-09-02 09:00:00'],
        ];

        $sortedTasks = (new TaskSorter())->sortTasks($tasks);

        self::assertSame(['High task', 'Medium task', 'Low task'], array_column($sortedTasks, 'title'));
    }

    public function testSortsOlderTasksFirstWhenPrioritiesMatch(): void
    {
        $tasks = [
            ['title' => 'Newer task', 'priority' => 'medium', 'created_at' => '2026-09-03 09:00:00'],
            ['title' => 'Older task', 'priority' => 'medium', 'created_at' => '2026-09-01 09:00:00'],
        ];

        $sortedTasks = (new TaskSorter())->sortTasks($tasks);

        self::assertSame(['Older task', 'Newer task'], array_column($sortedTasks, 'title'));
    }
}