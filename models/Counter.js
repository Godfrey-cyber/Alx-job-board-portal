import mongoose from 'mongoose'

const counterSchema = new mongoose.Schema({
	_id: { type: String, required: true }, // such as FRJB-JAN2025-000123
	seq: { type: Number, default: 0 },
})

export default mongoose.model('Counter', counterSchema)