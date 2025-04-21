// /pages/api/protected.js
import jwt from "jsonwebtoken";
import cookie from "cookie";

const secret = "your-secret-key"; // Use an environment variable for production

export default function handler(req, res) {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.auth_token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      // Verify the JWT token
      jwt.verify(token, secret);
      return res.status(200).json({ message: "Authenticated" });
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}