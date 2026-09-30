<?php

class TaskSorter
{
    public function sortTasks(array $tasks): array
    {
        $priorityOrder = ['high' => 3, 'medium' => 2, 'low' => 1];

        usort($tasks, function (array $firstTask, array $secondTask) use ($priorityOrder): int {
            $priorityComparison = $priorityOrder[$secondTask['priority']] <=> $priorityOrder[$firstTask['priority']];

            return $priorityComparison !== 0
                ? $priorityComparison
                : strtotime($firstTask['created_at']) <=> strtotime($secondTask['created_at']);
        });

        return $tasks;
    }
}