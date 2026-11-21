import { calculateAttendance, requiredClasses } from '@varad123/student-toolkit';

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
    const { attended, total, target = 75, precision = 2 } = body;

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

    return res.status(200).json({
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
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
}
