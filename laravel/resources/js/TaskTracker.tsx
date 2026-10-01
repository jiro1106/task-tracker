import { useEffect, useRef, useState, type FormEvent } from 'react';
import { requestJson, tasksUrl } from './taskApi.js';

type TaskPriority = 'low' | 'medium' | 'high';
type TaskStatus = 'pending' | 'completed';
type TaskFilter = 'all' | TaskStatus;

type Task = {
    id: number;
    title: string;
    description: string | null;
    priority: TaskPriority;
    status: TaskStatus;
    created_at: string;
};

function formatCreatedAt(value: string) {
    const date = new Date(value);

    return {
        date: date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
        time: date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }),
    };
}

export default function TaskTracker() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<TaskFilter>('all');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<TaskPriority>('low');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [action, setAction] = useState<string | null>(null);
    const [error, setError] = useState('');
    const dialog = useRef<HTMLDialogElement>(null);

    async function loadTasks(status: TaskFilter = filter) {
        setLoading(true);
        setError('');

        try {
            setTasks(await requestJson(tasksUrl(status)));
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Could not load tasks. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadTasks();
    }, [filter]);

    function closeDialog() {
        dialog.current?.close();
    }

    async function createTask(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            await requestJson('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, priority }),
            });
            setTitle('');
            setDescription('');
            setPriority('low');
            closeDialog();
            await loadTasks();
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Could not create task. Please try again.');
        } finally {
            setSubmitting(false);
        }
    }

    async function updateTask(task: Task, type: 'complete' | 'delete') {
        setAction(`${type}-${task.id}`);
        setError('');

        try {
            await requestJson(`/api/tasks/${task.id}${type === 'complete' ? '/complete' : ''}`, {
                method: type === 'complete' ? 'PATCH' : 'DELETE',
            });
            await loadTasks();
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Could not update task. Please try again.');
        } finally {
            setAction(null);
        }
    }

    return (
        <main className="tracker-shell">
            <div className="tracker">
                <header className="tracker-header">
                    <h1>Task Tracker</h1>
                    <button className="button button-primary" onClick={() => dialog.current?.showModal()} type="button"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>New task</button>
                </header>

                <section aria-labelledby="tasks-heading" className="task-panel">
                    <div className="task-toolbar">
                        <div>
                            <h2 id="tasks-heading">Tasks</h2>
                            <p>{loading ? 'Loading your tasks' : `${tasks.length} ${filter === 'all' ? 'task' : filter + ' task'}${tasks.length === 1 ? '' : 's'}`}</p>
                        </div>
                        <label className="filter-control">
                            <span>Show</span>
                            <select value={filter} onChange={(event) => setFilter(event.target.value as TaskFilter)}>
                                <option value="all">All tasks</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                        </label>
                    </div>

                    {error && <p className="notice" role="alert">{error}</p>}

                    {!loading && tasks.length > 0 && <div className="task-table-wrap">
                        <table>
                            <colgroup><col className="task-column" /><col /><col /><col /><col /><col /></colgroup>
                            <thead><tr><th>Task</th><th>Description</th><th>Priority</th><th>Status</th><th>Created</th><th><span className="sr-only">Actions</span></th></tr></thead>
                            <tbody>
                                {tasks.map((task) => {
                                    const taskAction = action?.endsWith(`-${task.id}`);
                                    const createdAt = formatCreatedAt(task.created_at);
                                    return <tr key={task.id}>
                                        <td><span className="task-title">{task.title}</span></td>
                                        <td className="task-description">{task.description || '—'}</td>
                                        <td><span className={`badge badge-${task.priority}`}>{task.priority}</span></td>
                                        <td><span className={`status status-${task.status}`}>{task.status}</span></td>
                                        <td className="created-at"><time dateTime={task.created_at}><span>{createdAt.date}</span><span>{createdAt.time}</span></time></td>
                                        <td className="task-actions">
                                            {task.status === 'pending' && <button className="button button-success" disabled={taskAction} onClick={() => updateTask(task, 'complete')} type="button"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6" /></svg>{action === `complete-${task.id}` ? 'Completing…' : 'Complete'}</button>}
                                            <button aria-label="Delete task" className="button button-destructive" disabled={taskAction} onClick={() => updateTask(task, 'delete')} type="button"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 7h16M10 11v6M14 11v6M9 7V4h6v3M6 7l1 13h10l1-13" /></svg>Delete</button>
                                        </td>
                                    </tr>;
                                })}
                            </tbody>
                        </table>
                    </div>}
                    {loading && <div className="empty-state">Loading tasks…</div>}
                    {!loading && tasks.length === 0 && <div className="empty-state">
                        <h3>{filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}</h3>
                        <p>{filter === 'all' ? 'Create your first task to start tracking your work.' : 'Try another filter to see the rest of your tasks.'}</p>
                        {filter === 'all'
                            ? <button className="button button-primary" onClick={() => dialog.current?.showModal()} type="button">New task</button>
                            : <button className="button button-ghost" onClick={() => setFilter('all')} type="button">Show all tasks</button>}
                    </div>}
                </section>
            </div>

            <dialog aria-labelledby="new-task-heading" className="task-dialog" ref={dialog}>
                <form onSubmit={createTask}>
                    <div className="dialog-heading"><div><h2 id="new-task-heading">New task</h2><p>Add the details, then return to your list.</p></div></div>
                    <label><span>Title</span><input autoFocus name="title" onChange={(event) => setTitle(event.target.value)} required value={title} /></label>
                    <label><span>Description <small>(optional)</small></span><textarea name="description" onChange={(event) => setDescription(event.target.value)} value={description} /></label>
                    <label><span>Priority</span><select name="priority" onChange={(event) => setPriority(event.target.value as TaskPriority)} value={priority}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></label>
                    <div className="dialog-actions"><button className="button button-ghost" onClick={closeDialog} type="button">Cancel</button><button className="button button-primary" disabled={submitting} type="submit">{submitting ? 'Adding…' : 'Add task'}</button></div>
                </form>
            </dialog>
        </main>
    );
}
