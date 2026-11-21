import { calculatePercentage } from '@varad123/student-toolkit';

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
    const { marks, total, precision = 2 } = body;

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

    return res.status(200).json({
      success: true,
      data: {
        marks: Number(marks),
        total: Number(total),
        percentage
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
}
