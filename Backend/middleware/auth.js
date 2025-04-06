import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login again." });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.id;  // ✅ Attach to req, not req.body
    next();
  } catch (error) {
    console.log("JWT Error:", error);
    res.json({ success: false, message: "Token invalid or expired" });
  }
};

export default authMiddleware;
