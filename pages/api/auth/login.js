export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (email === process.env.email && password === process.env.password) {
      const token = 'dummy-token';
      res.status(200).json({ token, userId: 1, email });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}