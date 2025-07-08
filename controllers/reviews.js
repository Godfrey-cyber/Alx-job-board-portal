import Review from '../models/Reviews.js'
import Job from '../models/Job.js'

// Create a Review
export const addReview = async (req, res, next) => {
	try {
		const { rating, comment, job } = req.body

		const savedReview = await Review.create({ rating, comment, user: req.userId, job })

		// await savedReview.populate('user', 'name email')

		// pushing review in the job
		await Job.findByIdAndUpdate(job, { $push: { reviews: savedReview._id } }, { new: true })
		res.status(201).json({
			success: true,
			savedReview,
			status: 201,
		})

		console.log(savedReview)
	} catch (error) {
		res.status(401).json({ success: false, error, status: 401 })
		console.log(error)
		next()
	}
}