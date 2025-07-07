import bcrypt from 'bcryptjs'
import User from '../models/Users.js'
import jwt from 'jsonwebtoken'

import { createRefreshToken, createAccessToken, validateEmail, validatePassword } from '../utilities/utiles.js'

export const register = async (req, res, next) => {
	try {
		const { firstName, lastName, password, email } = req.body

		if (!email || !password || !firstName || !lastName) {
			return res.status(400).json({ msg: '❌ Please enter all fields' })
		}

		// Validate email format
		try {
			validateEmail(email) // checks if the email contains an @
		} catch (error) {
			return res.status(400).json({ msg: error.message })
		}

		// Validate password format
		try {
			validatePassword(password) // checks if the password meets the required criteria
		} catch (error) {
			return res.status(400).json({ msg: error.message })
		}

		// check if user exists
		const user = await User.findOne({ email })
		if (user) {
			return res.status(400).json({ msg: '🚫 User registration failed!' })
		}

		// create a user
		const newUser = new User({ firstName, lastName, password, email })
		await newUser.save()
		return res.status(201).json({ msg: 'User Registration successfull🥇' })
	} catch (error) {
		console.log(error)
		next(error)
	}
}

export const login = async (req, res, next) => {
	try {
		const { password, email } = req.body
		if (!email || !password) {
			return res.status(400).json({ msg: '❌ Please fill in all fields' })
		}

		// Validate email & password format
		try {
			validateEmail(email)
			validatePassword(password)
		} catch (error) {
			return res.status(400).json({ msg: error.message })
		}

		// check if user exists
		// const user = await User.findOne({ email })
		const user = await User.findOne({ email }).select('+password')
		if (!user) {
			return res.status(400).json({ msg: '🚫 This email does not exist!' })
		}

		const ifPasswordIsCorrect = await bcrypt.compare(password, user.password)
		if (!ifPasswordIsCorrect) {
			return res.status(400).json({ msg: '🚫 Invalid email or password.' })
		}

		// Generate tokens
		const accessToken = createAccessToken(user._id)
		const refreshToken = createRefreshToken(user._id)

		user.refreshTokens.push(refreshToken)
		await user.save()

		// console.log(userData)
		// Send refresh token to the front-end
		res.cookie('refreshToken', refreshToken, {
			path: '/',
			httpOnly: true,
			maxAge: 86400000,
			sameSite: 'Strict',
			secure: process.env.NODE_ENV === 'production',
		})
		res.status(200).json({ accessToken, user })
	} catch (error) {
		console.log(error.message)
		console.log(error)
		next(error)
	}
}

// logout user
export const logout = async (req, res, next) => {
	
}

// Change Password
export const changePassword = async (req, res, next) => {
	
}

// Refresh Access Token
export const refreshAccessToken = async (req, res, next) => {
	
}
