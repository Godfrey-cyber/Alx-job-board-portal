import mongoose from 'mongoose'

export const connectDb = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL)
		console.log('MongoDb connected successfully')
	} catch (error) {
		console.error('MongoDb connnection error:', error.message, error)
		process.exit(1)
	}
}
