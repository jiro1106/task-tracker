# Simple Task Tracker

## Part 1: Task Sorter

This project contains the Part 1 PHP task sorter and the Part 2 Laravel task API.

### Requirements

- PHP 8.5 or later
- Composer
- Docker Desktop (for Part 2)

### Run locally

1. Install the project dependencies:

   ```bash
   composer install
   ```

2. Run the TaskSorter tests:

   ```bash
   ./vendor/bin/phpunit tests/TaskSorterTest.php
   ```

   A successful result shows `OK (2 tests, 2 assertions)`.

## Part 2: Task API

The API uses Laravel Sail, Docker, and MySQL. Docker Desktop must be running before these commands.

1. Install the Laravel dependencies and create the local environment file:

   ```bash
   cd laravel
   composer install
   cp .env.example .env
   ```

2. Build and start the application and MySQL containers:

   ```bash
   ./vendor/bin/sail up -d --build
   ```

3. Generate the Laravel application key and create the database tables:

   ```bash
   ./vendor/bin/sail artisan key:generate
   ./vendor/bin/sail artisan migrate
   ```

4. Confirm the API routes and request the task list:

   ```bash
   ./vendor/bin/sail artisan route:list --path=api
   curl http://localhost/api/tasks
   ```

The API is available at `http://localhost/api/tasks`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/tasks` | List tasks; optionally filter with `?status=pending` or `?status=completed` |
| POST | `/api/tasks` | Create a task |
| PATCH | `/api/tasks/{id}/complete` | Mark a task as completed |
| DELETE | `/api/tasks/{id}` | Delete a task |

To stop the Part 2 containers when finished:

```bash
./vendor/bin/sail down
```

## AI Disclosure

- **AI tool used:** Codex.
- **AI-assisted areas:** Initial drafts of `src/TaskSorter.php`, `tests/TaskSorterTest.php`, the Laravel task API, and this README.
- **Candidate review:** I reviewed the TaskSorter and API code, verified the Part 1 PHPUnit tests, and manually verified each Part 2 API route.

This disclosure and the setup instructions will be updated as Part 3 and Part 4 are completed.
