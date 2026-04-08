// import user from "../models/userModel.js";
// import jwt from "jsonwebtoken";

 
// const JWT_SECRET ='YOUR_SECRET_HERE';

// export default async function authMiddleware(req, res, next) {
//     //grab the token
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ success: false, message: "Unauthorized" });
//     }
//     const token = authHeader.split(" ")[1]; 
//     //verify the token
//     try {
//         const payload = jwt.verify(token, JWT_SECRET);
//         const  user = await user.findById(payload.id).select("-password");
//         if (!user) {
//             return res.status(401).json({ success: false, message: "user not found" });
//         }        req.user = decoded; // Attach user info to request object
//         next();
//     } catch (err) {
//         console.error("JWT verification failed:", err);
//         return res.status(401).json({ success: false, message: "Invalid token" });
//     }
// }
import jwt from "jsonwebtoken";

const JWT_SECRET = "YOUR_SECRET_HERE";

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // 🔥 Extract token from "Bearer xxx"
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded; // 🔥 THIS IS WHAT YOU ARE MISSING

    next();
  } catch (error) {
    console.log("Auth Error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;