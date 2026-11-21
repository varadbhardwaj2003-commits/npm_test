export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({
    status: 'ok',
    package: '@varad123/student-toolkit',
    timestamp: new Date().toISOString()
  });
}
