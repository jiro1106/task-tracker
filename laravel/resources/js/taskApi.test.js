import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { requestJson, tasksUrl } from './taskApi.js';

test('tasksUrl uses the status query only for a selected status', () => {
    assert.equal(tasksUrl('all'), '/api/tasks');
    assert.equal(tasksUrl('pending'), '/api/tasks?status=pending');
    assert.equal(tasksUrl('completed'), '/api/tasks?status=completed');
});

test('requestJson surfaces the API message when a request fails', async () => {
    const originalFetch = global.fetch;
    global.fetch = async () => new Response(JSON.stringify({ message: 'Title is required.' }), { status: 400 });

    try {
        await assert.rejects(requestJson('/api/tasks'), { message: 'Title is required.' });
    } finally {
        global.fetch = originalFetch;
    }
});

test('completed tasks use the status chip instead of a redundant disabled action', async () => {
    const component = await readFile(new URL('./TaskTracker.tsx', import.meta.url), 'utf8');
    const styles = await readFile(new URL('../css/app.css', import.meta.url), 'utf8');

    assert.match(component, /task\.status === 'pending'\s*\? <button className="button button-success"/);
    assert.doesNotMatch(component, /button-completed/);
    assert.doesNotMatch(styles, /\.button-completed/);
});

test('task table aligns with the tasks heading and reserves less space for descriptions', async () => {
    const styles = await readFile(new URL('../css/app.css', import.meta.url), 'utf8');

    assert.match(styles, /\.task-toolbar \{[^}]*padding: 20px 0 16px;/);
    assert.match(styles, /\.task-table-wrap th:first-child, \.task-table-wrap td:first-child \{[^}]*padding-left: var\(--space-5\);/);
    assert.match(styles, /\.task-table-wrap th:nth-child\(2\), \.task-table-wrap td:nth-child\(2\) \{ width: 18%; \}/);
});

test('form controls retain a visible keyboard focus ring', async () => {
    const styles = await readFile(new URL('../css/app.css', import.meta.url), 'utf8');

    assert.match(styles, /select:focus-visible, input:focus-visible, textarea:focus-visible \{ outline: 2px solid var\(--ink\); outline-offset: 2px; \}/);
});
