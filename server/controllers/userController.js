import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';


const signToken = (id) =>
jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '1h' });


export const signup = async (req, res) => {
try {
const { username, email, password } = req.body;


const exists = await User.findOne({ email });
if (exists) return res.status(409).json({ message: 'Email already in use' });


const newUser = await User.create({ username, email, password });
const token = signToken(newUser._id);


return res.status(201).json({
message: 'New user added successfully!',
token,
user: { id: newUser._id, username: newUser.username, email: newUser.email },
});
} catch (err) {
console.error('Signup error:', err);
res.status(500).json({ message: 'Something went wrong' });
}
};


export const login = async (req, res) => {
try {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: 'Invalid email' });


const ok = await user.comparePassword(password);
if (!ok) return res.status(400).json({ message: 'Invalid password' });


const token = signToken(user._id);
return res.json({
message: 'Login successful',
token,
user: { id: user._id, username: user.username, email: user.email },
});
} catch (err) {
console.error('Login error:', err);
return res.status(500).json({ message: 'Something went wrong' });
}
};


export const me = async (req, res) => {
try {
const user = await User.findById(req.user.id).select('_id username email');
if (!user) return res.status(404).json({ message: 'User not found' });
return res.json(user);
} catch (err) {
return res.status(500).json({ message: 'Something went wrong' });
}
};