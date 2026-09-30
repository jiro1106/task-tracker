<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = Task::query();

        if ($request->filled('status')) {
            $query->where('status', $request->query('status'));
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $title = $request->input('title');

        if (! is_string($title) || trim($title) === '') {
            return response()->json(['message' => 'Title is required.'], 400);
        }

        $priority = $request->input('priority', 'low');

        if (! in_array($priority, ['low', 'medium', 'high'], true)) {
            return response()->json(['message' => 'Priority must be low, medium, or high.'], 400);
        }

        $task = new Task;
        $task->title = trim($title);
        $task->description = $request->input('description');
        $task->priority = $priority;
        $task->status = 'pending';
        $task->save();

        return response()->json($task, 201);
    }

    public function complete(Task $task)
    {
        $task->status = 'completed';
        $task->save();

        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json(['message' => 'Task deleted.']);
    }
}
