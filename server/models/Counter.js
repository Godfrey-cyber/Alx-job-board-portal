import mongoose from 'mongoose'

const counterSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	seq: { type: Number, default: 0 },
})

export default mongoose.model('Counter', counterSchema)