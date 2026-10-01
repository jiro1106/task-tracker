# Simple Task Tracker

## Part 1: Task Sorter

This project contains the Part 1 PHP task sorter, Part 2 Laravel task API, and Part 3 React frontend.

### Requirements

- PHP 8.5 or later
- Composer
- Docker Desktop (for Parts 2 and 3)
- Node.js and npm (for Part 3)

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

## Part 3: Frontend

With the Sail containers running, install the frontend dependencies and start Vite in another terminal:

```bash
cd laravel
npm install
npm run dev
```

Open `http://localhost`. The UI lets you create tasks, choose a priority, filter by status, complete tasks, and delete tasks without a page refresh.

To create a production frontend bundle instead:

```bash
cd laravel
npm run build
```

| Method | Endpoint                   | Purpose                                                                     |
| ------ | -------------------------- | --------------------------------------------------------------------------- |
| GET    | `/api/tasks`               | List tasks; optionally filter with `?status=pending` or `?status=completed` |
| POST   | `/api/tasks`               | Create a task                                                               |
| PATCH  | `/api/tasks/{id}/complete` | Mark a task as completed                                                    |
| DELETE | `/api/tasks/{id}`          | Delete a task                                                               |

To stop the Part 2 containers when finished:

```bash
./vendor/bin/sail down
```

## AI Disclosure

- **AI tool used:** ChatGPT/Codex.
- **AI-assisted areas:** Initial drafts of `src/TaskSorter.php`, `tests/TaskSorterTest.php`, the Laravel task API, React frontend, frontend API helpers/tests, and this README.
- **Candidate review and changes:** I manually read and reviewed all submitted code to ensure I understand every line. I cleaned up variable names for clarity, redesigned the frontend after the initial AI-generated draft, and reviewed the AI-assisted code for bugs, unused files, and unnecessary logic. I also verified the Part 1 PHPUnit tests, manually tested each Part 2 API route, and ran the frontend production build and API-helper tests.
