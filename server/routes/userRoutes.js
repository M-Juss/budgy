import express from 'express'

import { signup, login, me } from '../controllers/userController.js'

const router = express.Router()

// create new user
router.post("/signup", signup)
router.post('/login', login)
router.get('/me', me )


export default router;
