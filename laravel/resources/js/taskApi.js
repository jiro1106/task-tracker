export function tasksUrl(status) {
    return status === 'all' ? '/api/tasks' : `/api/tasks?status=${status}`;
}

export async function requestJson(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        headers: { Accept: 'application/json', ...options.headers },
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.message || 'Request failed.');
    }

    return data;
}
