import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv-flow'
// import helmet from "helmet"
import { connectDb } from './config/db.js'

import authRoutes from './routes/auth.js'
import jobRoutes from './routes/jobs.js'
import jobReviews from './routes/reviews.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())
const allowedOrigins = ['https://alx-job-board-portal.vercel.app', 'http://localhost:5173']
app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin) return callback(null, true)
			if (allowedOrigins.includes(origin)) {
				return callback(null, true)
			} else {
				return callback(new Error('CORS not allowed from this origin ->: ' + origin))
			}
		},
		credentials: true,
	})
)

connectDb()

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', jobRoutes)
app.use('/api/v1/reviews', jobReviews)

const PORT = process.env.PORT || process.env.npm_package_config_port

app.listen(PORT, () => {
	console.log(`Success 💯! Servers running on port: ${PORT} 👍👍`)
	console.log(`Running on ${process.env.NODE_ENV} environment`)
})
