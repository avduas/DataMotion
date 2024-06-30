const { request } = require('express');
const jwt = require('jsonwebtoken');

function generateToken(user) {
    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        console.log('Data: ', { email: user.email, id: user.id });
        const token = jwt.sign({ email: user.email, id: user.id }, secretKey, { expiresIn: '10h' });
        console.log('Token generated:', token);
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        return null;
    }
}

function verifyToken(token) {
  const secretKey = process.env.JWT_SECRET_KEY;
  try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
  } catch (error) {
      console.error('Token verification failed:', error);
      return null;
  }
}

async function authenticateUser(req, res, next) {
    try {
        const token = req.cookies.token;

        // console.log('Received token:', token);

        if (!token) {
            return res.status(401).json({ error: 'Authorization token not provided', logOut:true });
        }

        const decodedToken = verifyToken(token);

        if (!decodedToken) {
            return res.status(401).json({ error: 'Invalid authorization token' });
        }

        req.user = decodedToken;

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    generateToken,
    verifyToken,
    authenticateUser
};
