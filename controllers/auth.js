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
	try {
		const refreshToken = req.cookies.refreshToken
		if (!refreshToken) return res.status(400).json({ msg: '🚫 No refresh token provided' })

		// Find user and remove refresh token
		const user = await User.findOneAndUpdate(
			{ refreshTokens: refreshToken },
			{ $pull: { refreshTokens: refreshToken } },
			{ new: true }
		)

		if (!user) return res.status(400).json({ msg: '🚫 Invalid refresh token' })

		res.clearCookie('refreshToken', { path: '/' })
		res.status(200).json({ msg: '✅ Logged out successfully' })
	} catch (error) {
		console.error(error)
		next(error)
	}
}

// Change Password
export const changePassword = async (req, res, next) => {
	try {
		const { previousPassword, password } = req.body
		// Validate user fields
		if (!previousPassword || !password) return res.status(400).json({ message: '❌ Please enter all fields.' })
		// Validate password format
		try {
			validatePassword(password)
		} catch (error) {
			return res.status(400).json({ msg: error.message })
		}
		// Fetch user from the database
		const user = await User.findById(req.userId)
		console.log(req.userId)
		console.log('before', user)
		if (!user) {
			return res.status(401).json({ message: '❌ User not found. Please log in again.' })
		}
		console.log('After', user)

		// Check if the previous password matches the user's current password
		const isPasswordMatch = await bcrypt.compare(previousPassword, user.password)
		console.log('user', user)
		console.log('is password match', isPasswordMatch)

		if (!isPasswordMatch) {
			return res.status(400).json({
				message: '🚫 Passwords did not match, please try again❗',
			})
		}

		// Update and save the new password
		user.password = password
		await user.save()

		res.status(200).json({
			message: '✅ Password has been changed successfully!',
		})
	} catch (error) {
		next()
		console.log(error)
	}
}

// Refresh Access Token
export const refreshAccessToken = async (req, res, next) => {
	try {
		const refreshToken = req.cookies.refreshToken

		if (!refreshToken) {
			return res.status(401).json({ msg: '🚫 No refresh token provided' })
		}

		// Verify refresh token
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
			if (err) {
				return res.status(403).json({ msg: '🚫 Invalid refresh token' })
			}

			// Check if user exists
			const user = await User.findById(decoded.userId).select('-password')
			if (!user || !user.refreshTokens.includes(refreshToken)) {
				return res.status(403).json({ msg: '🚫 User not found' })
			}

			// Generate new access token
			const accessToken = createAccessToken(user._id)

			res.status(200).json({ accessToken, user })
		})
	} catch (error) {
		console.error(error)
		next(error)
	}
}
