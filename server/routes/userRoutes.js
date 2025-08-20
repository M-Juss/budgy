import express from 'express'

import { signup } from '../controllers/userController.js'

const router = express.Router()

// create new user
router.post("/signup", signup)


export default router;
