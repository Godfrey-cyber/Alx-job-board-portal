import Review from '../models/Reviews.js'
import Job from '../models/Job.js'

// Create a Review
export const addReview = async (req, res, next) => {
	try {
		const { rating, comment, jobID, freelancerID, employer } = req.body

		const savedReview = await Review.create({ rating, comment, employer: req.userId, freelancer: freelancerID, job: jobID })


		// const result = await Review.aggregate([
	    //   { $match: { freelancer: mongoose.Types.ObjectId(reviewedUserId) } },
	    //   {
	    //     $group: {
	    //       _id: '$reviewedUser',
	    //       averageRating: { $avg: '$rating' },
	    //       totalReviews: { $sum: 1 }
	    //     }
	    //   }
	    // ])

    	// await Job.findByIdAndUpdate(user, { averageRating: averageRating.toFixed(1) })

    	const result = await Review.aggregate([
		  { $match: { user: mongoose.Types.ObjectId(user) } },
		  { $group: { _id: '$job', averageRating: { $avg: '$rating' } } }
		])

		const newAverage = result[0]?.averageRating || 0
		await Job.findByIdAndUpdate(user, { averageRating: newAverage.toFixed(1) })

		res.status(201).json({
			success: true,
			savedReview,
			status: 201,
		})

		console.log(savedReview)
	} catch (error) {
		res.status(401).json({ success: false, error, status: 401 })
		console.log(error)
		next(error)
	}
}