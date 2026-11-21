import { calculateSGPA } from '@varad123/student-toolkit';

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
    const { subjects, precision = 2 } = body;

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

    return res.status(200).json({
      success: true,
      data: {
        totalSubjects: subjects.length,
        totalCredits,
        sgpa
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
}
