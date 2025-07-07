import {
	addJob, jobs
} from '../controllers/jobs.js'
import { authenticate, restrictTo } from '../middleware/middleware.js'
// import { apiLimiter } from "../middleware/rateLimiter.js";
import express from 'express'
const router = express.Router()

router.post('/add-job', authenticate, addJob)
router.get('/get-jobs', jobs)

export default router
