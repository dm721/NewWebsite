// pages/api/auth.js

export default function handler(req, res) {
    if (req.method === 'POST') {
      const { password } = req.body;
  
      // Check if the password is correct (store this securely on the server-side)
      const correctPassword = process.env.PASSWORD; // Store the password in an environment variable
  
      if (password === correctPassword) {
        // Set a cookie or session to indicate the user is authenticated
        res.status(200).json({ message: 'Success' });
      } else {
        res.status(401).json({ message: 'Incorrect password' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  