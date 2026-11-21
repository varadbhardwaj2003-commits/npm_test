export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({
    message: 'Welcome to @varad123/student-toolkit API',
    endpoints: [
      '/api/attendance',
      '/api/percentage',
      '/api/sgpa',
      '/api/cgpa',
      '/api/health'
    ]
  });
}
