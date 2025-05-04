const User = require('../../models/User');
const jwt = require('jsonwebtoken');

const auth = (roles = []) => {
  return async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Check if the user has one of the allowed roles (optional)
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      // Attach user info to the request object
      req.user = user;

      next(); // Allow the request to continue
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};


module.exports = { auth };