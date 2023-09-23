const jwt = require('jsonwebtoken');

function AuthUser(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'Missing or invalid token' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    // Successfully authenticated, add the user data to the request object
    req.user = data;
    next();
  });
}

function GenerateToken(doc) {
  const token = jwt.sign(doc, process.env.SECRET_KEY, {
      expiresIn: '1H'
  });
  console.log(token);
  return token;
}

module.exports = {AuthUser, GenerateToken};