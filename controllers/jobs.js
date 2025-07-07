import Job from '../models/Job.js'
import Counter from '../models/Counter.js'
import slugify from 'slugify'

export const addJob = async (req, res, next) => {
	try {
		const { title, description, location, requirements, employmentType, salaryRange, benefits, categories, tags, remote, views, applicationDeadline, status, postedBy, isSyncedToElastic  } =
			req.body

		// Basic validation
		if (
			!title ||
			!description ||
			!employmentType ||
			!salaryRange ||
			!requirements ||
			!location ||
			!benefits || 
			!categories || 
			!tags || 
			!applicationDeadline
		) {
			return res.status(400).json({ message: '❌ Required fields are missing.' })
		}

		const slug = slugify(title, { lower: true })

		// Check for duplicate slug
		const existingJob = await Job.findOne({ slug })
		if (existingJob) {
			return res.status(409).json({ message: '🚫 A Job with this title already exists.' })
		}

		// Create the Job
		const newJob = new Job({
			title, description, location, requirements, employmentType, salaryRange, benefits, categories, tags, remote, views, applicationDeadline, status, postedBy: req.userId, isSyncedToElastic,
			host: req.userId, // assuming req.userId is set by auth middleware
		})
		await newJob.save()
		console.log(req.user)
		res.status(201).json({
			message: '✅ Job created successfully!',
			job: newJob,
		})
	} catch (error) {
		console.error('Error adding job:', error.message)
		next()
	}
}