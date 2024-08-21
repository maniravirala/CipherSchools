const jwt = require('jsonwebtoken');

const getUserId = (req) => {
    const { token } = req.cookies;
    if (!token) {
        return null;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
}

module.exports = getUserId;