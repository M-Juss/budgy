import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    const auth = req.headers.authorization || '';
    if (!auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided.' });
    }

    const token = auth.split(' ')[1];
        if (!token || token === 'null' || token === 'undefined') {
            return res.status(401).json({ message: 'No token provided.' });
        }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};