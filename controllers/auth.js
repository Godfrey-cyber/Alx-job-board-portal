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
