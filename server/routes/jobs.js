import {
	addJob, jobs, myJobs, editJob, getJob
} from '../controllers/jobs.js'
import { authenticate, restrictTo } from '../middleware/middleware.js'
// import { apiLimiter } from "../middleware/rateLimiter.js";
import express from 'express'
const router = express.Router()

router.post('/add-job', authenticate, addJob)
router.get('/get-jobs', jobs)
router.get('/my-jobs', authenticate, restrictTo('employer', 'admin'), myJobs)
router.patch('/edit-job/:id', authenticate, restrictTo('employer', 'admin'), editJob)
router.get('/get-job/:id', getJob)

export default router

// http://localhost:8000/api/v1/jobs/get-jobs?industry=Software%20&%20Data&experience=Senior%20Level&location=KE