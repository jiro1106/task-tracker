import { createRoot } from 'react-dom/client';
import TaskTracker from './TaskTracker';

const app = document.getElementById('app');

if (app) {
    createRoot(app).render(<TaskTracker />);
}
