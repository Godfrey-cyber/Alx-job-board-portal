import { addReview } from '../controllers/reviews.js'
import { authenticate, restrictTo } from '../middleware/middleware.js'
import express from 'express'
const router = express.Router()

router.post('/add-review', authenticate, restrictTo('employer'), addReview)
// router.get('/get-reviews', authenticate, restrictTo('host', 'admin'), reviews)
// router.get('/destination-reviews/:id', authenticate, restrictTo('host', 'admin'), destinationReviews)

export default router
