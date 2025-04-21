import jwt from "jsonwebtoken";
import cookie from "cookie";

const secret = "your-secret-key"; // Use an environment variable for production

export default function handler(req, res) {
  if (req.method === "POST") {
    const { password } = req.body;

    // Validate the password
    if (password === "your-secure-password") {
      // Create a JWT token
      const token = jwt.sign({ user: "authenticated" }, secret, {
        expiresIn: "1h", // Token expires in 1 hour
      });

      // Set the token as a cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Use secure cookies in production
          maxAge: 3600, // 1 hour expiration
          path: "/",
        })
      );

      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}