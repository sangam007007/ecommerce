const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[2];
    if (!token) return res.status(401).json({ message: 'Access denied' });
    console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB1:",req.headers.authorization)
    console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB2:",process.env.JWT_SECRET)
    console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB3:",token,process.env.JWT_SECRET)
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        console.log("ERROR:",err)
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
