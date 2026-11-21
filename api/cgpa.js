import { calculateCGPA } from '@varad123/student-toolkit';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { semesters, precision = 2 } = body;

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

    return res.status(200).json({
      success: true,
      data: {
        totalSemesters: semesters.length,
        cgpa
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
}
