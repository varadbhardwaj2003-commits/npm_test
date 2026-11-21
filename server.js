import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  calculateAttendance,
  requiredClasses,
  calculatePercentage,
  calculateSGPA,
  calculateCGPA
} from '@varad123/student-toolkit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    package: '@varad123/student-toolkit',
    timestamp: new Date().toISOString()
  });
});

// 1. Attendance & Goal Planning Endpoint
app.post('/api/attendance', (req, res) => {
  try {
    const { attended, total, target = 75, precision = 2 } = req.body;

    if (attended === undefined || total === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: "attended" and "total" are required.'
      });
    }

    const currentAttendance = calculateAttendance(
      Number(attended),
      Number(total),
      Number(precision)
    );

    const neededClasses = requiredClasses(
      Number(attended),
      Number(total),
      Number(target)
    );

    res.json({
      success: true,
      data: {
        attended: Number(attended),
        total: Number(total),
        target: Number(target),
        currentAttendance,
        neededClasses: neededClasses === Infinity ? 'Infinity' : neededClasses,
        status: currentAttendance >= Number(target) ? 'Eligible' : 'At Risk'
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// 2. Exam Percentage Endpoint
app.post('/api/percentage', (req, res) => {
  try {
    const { marks, total, precision = 2 } = req.body;

    if (marks === undefined || total === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: "marks" and "total" are required.'
      });
    }

    const percentage = calculatePercentage(
      Number(marks),
      Number(total),
      Number(precision)
    );

    res.json({
      success: true,
      data: {
        marks: Number(marks),
        total: Number(total),
        percentage
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// 3. Semester SGPA Endpoint
app.post('/api/sgpa', (req, res) => {
  try {
    const { subjects, precision = 2 } = req.body;

    if (!Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Expected "subjects" to be a non-empty array of { credits, gradePoint }.'
      });
    }

    const formattedSubjects = subjects.map(s => ({
      credits: Number(s.credits),
      gradePoint: Number(s.gradePoint)
    }));

    const sgpa = calculateSGPA(formattedSubjects, Number(precision));
    const totalCredits = formattedSubjects.reduce((acc, s) => acc + s.credits, 0);

    res.json({
      success: true,
      data: {
        totalSubjects: subjects.length,
        totalCredits,
        sgpa
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// 4. Cumulative CGPA Endpoint
app.post('/api/cgpa', (req, res) => {
  try {
    const { semesters, precision = 2 } = req.body;

    if (!Array.isArray(semesters) || semesters.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Expected "semesters" to be a non-empty array of semester SGPAs or { sgpa, credits }.'
      });
    }

    const formatted = semesters.map(s => {
      if (typeof s === 'number') return Number(s);
      if (s && typeof s === 'object') {
        return {
          sgpa: Number(s.sgpa),
          credits: s.credits !== undefined ? Number(s.credits) : 1
        };
      }
      return s;
    });

    const cgpa = calculateCGPA(formatted, Number(precision));

    res.json({
      success: true,
      data: {
        totalSemesters: semesters.length,
        cgpa
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Student Toolkit Demo Server listening on port ${PORT}`);
    console.log(`🌐 Web interface available at http://localhost:${PORT}`);
  });
}

export default app;

