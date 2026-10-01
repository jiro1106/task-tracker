import assert from 'node:assert/strict';
import test from 'node:test';
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
