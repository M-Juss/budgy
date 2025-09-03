import express from 'express'
import { signup, login, me } from '../controllers/userController.js'
import {protect} from "../middleware/authMiddleware.js"


const router = express.Router()

// create new user
router.post("/signup", signup)
router.post('/login', login)
router.get('/me', protect, me )


export default router;
