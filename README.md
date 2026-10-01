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

Docker is used to provide the same Laravel and MySQL environment on every machine, avoiding differences in locally installed PHP, Laravel, or MySQL versions.

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

- **AI tools used:** ChatGPT/Codex.

- **AI-assisted areas:**
  - Initial implementation of `src/TaskSorter.php` and `tests/TaskSorterTest.php`
  - Laravel task API, including routes, model, migration, and controller
  - React task-tracker interface, CSS, and frontend API helper
  - README setup documentation

- **My review, changes, and verification:**
  - Reviewed the submitted code to understand the sorting, API, and frontend request flows.
  - Added API validation for invalid status filters, titles longer than 255 characters, and non-string descriptions.
  - Redesigned and refined the initial AI-generated frontend layout, including the table layout, adding a delete confirmation modal to prevent accidental deletes, loading states, error messages and empty states, and disabled action buttons while requests are running.
  - Removed unused Laravel starter scaffolding and tests that did not cover required assessment behavior.
  - Ran the Part 1 PHPUnit tests and the frontend production build successfully.
  - Ran all the API routes using curl commands in the terminal to manually create a task, update it as complete, and delete it while verifying in the frontend.
