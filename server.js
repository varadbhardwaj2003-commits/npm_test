import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import attendanceHandler from './api/attendance.js';
import percentageHandler from './api/percentage.js';
import sgpaHandler from './api/sgpa.js';
import cgpaHandler from './api/cgpa.js';
import healthHandler from './api/health.js';
import indexHandler from './api/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.all('/api/attendance', attendanceHandler);
app.all('/api/percentage', percentageHandler);
app.all('/api/sgpa', sgpaHandler);
app.all('/api/cgpa', cgpaHandler);
app.all('/api/health', healthHandler);
app.all('/api', indexHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Student Toolkit Demo Server listening on port ${PORT}`);
  console.log(`🌐 Web interface available at http://localhost:${PORT}`);
});

export default app;
