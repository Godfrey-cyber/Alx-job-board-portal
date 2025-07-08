import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
	job: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Job',
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		default: 0,
		required: true,
	},
	comment: {
		type: String,
		default: '',
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	isPublished: {
		type: Boolean,
		default: true,
	},
})

export default mongoose.model('Review', reviewSchema)
