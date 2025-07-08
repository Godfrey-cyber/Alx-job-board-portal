import express from 'express'
import { authenticate, restrictTo } from '../middleware/middleware.js'
import { register, login, logout, changePassword } from '../controllers/auth.js'

const router = express.Router()

router.post('/register-user', register)
router.post('/login-user', login)
router.post('/logout', logout)
router.post('/change-password', authenticate, changePassword)

export default router