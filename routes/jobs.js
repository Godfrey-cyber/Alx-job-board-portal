import {
	addJob, jobs, myJobs
} from '../controllers/jobs.js'
import { authenticate, restrictTo } from '../middleware/middleware.js'
// import { apiLimiter } from "../middleware/rateLimiter.js";
import express from 'express'
const router = express.Router()

router.post('/add-job', authenticate, addJob)
router.get('/get-jobs', jobs)
router.get('/my-jobs', authenticate, restrictTo('employer', 'admin'), myJobs)

export default router
