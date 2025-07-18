import jwt from 'jsonwebtoken'
import User from '../models/Users.js'

export const authenticate = (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]

		if (!token) return res.status(401).json({ message: 'Access token required' })
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
			if (error) return res.status(403).json({ message: error.message })
			req.userId = decoded.userId
			console.log(req)
			next()
		})
	} catch (error) {
		return res.status(401).json({ msg: error.message })
	}
}

export const restrictTo = (...roles) => {
	return async (req, res, next) => {
		try {
			const token = req.headers.authorization?.split(' ')[1]

			if (!token) return res.status(401).json({ message: 'Access token required' })

			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, decoded) => {
				if (error) return res.status(403).json({ message: error.message })

				// Attach user data to request
				req.userId = decoded.userId

				// Find the user in the database
				const user = await User.findById(req.userId)
				if (!user) return res.status(404).json({ message: 'User not found' })

				// Check if user has required role
				if (!roles.includes(user.role)) {
					return res.status(403).json({ message: 'Access denied. You do not have the required role.' })
				}

				// If everything is okay, proceed to the next middleware
				next()
			})
		} catch (error) {
			return res.status(401).json({ msg: error.message })
		}
	}
}