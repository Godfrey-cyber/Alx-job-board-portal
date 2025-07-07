import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

//Create Access Token
export const createAccessToken = (userId) => {
	return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '15m',
	})
}

//Create Refresh Token
export const createRefreshToken = (userId) => {
	return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '7d',
	})
}

// Validate email
export const validateEmail = (email) => {
	let emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

	if (!emailFormat.test(email)) {
		throw new Error('❌ Please enter a valid email address❗')
	}
}

// Validate password
export const validatePassword = (password) => {
	let passValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/

	if (!passValid.test(password)) {
		throw new Error(
			'🚫 Password must be between 8 to 15 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'
		)
	}
}

export const mongoDbConnection = (res) => {
	if (mongoose.connection.readyState !== 1) {
		return res.status(500).json({ status: 'Fail', msg: 'Database not connected' })
	}
}