export function tasksUrl(status) {
    return status === 'all' ? '/api/tasks' : `/api/tasks?status=${status}`;
}

export async function requestJson(url, options = {}) {
    const response = await fetch(url, {
        headers: { Accept: 'application/json', ...options.headers },
        ...options,
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Request failed.');
    }

    return data;
}
