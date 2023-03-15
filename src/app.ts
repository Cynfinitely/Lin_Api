import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import jwt from 'jsonwebtoken'

import passport from 'passport'
import loginWithGoogle from './passport/google'

import productRouter from './routers/productRouter'

import apiErrorHandler from './middlewares/apiErrorHandler'
import { JWT_SECRET } from './util/secrets'
import userRouter from './routers/userRouter'

dotenv.config({ path: '.env' })
export const app = express()

// Express configuration
app.set('port', process.env.PORT)

// Global middleware
app.use(
  cors({
    origin: '*',
  })
)
// app.use(apiContentType)
app.use(express.json())

app.use(passport.initialize())
passport.use(loginWithGoogle())

// Set up routers
app.use('/api/', productRouter)
app.use('/api/', userRouter)
app.get('/api/', (req, res) => {
  res.send('hello world')
})

app.post(
  '/api/googleLogin',
  passport.authenticate('google-id-token', { session: false }),
  (req, res) => {
    console.log('HERE IS THE GOODLE USER', req.user)
    const user = req.user as any
    const userEmail = user.email
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      JWT_SECRET,
      {
        expiresIn: '1h',
      }
    )
    res.json({ token, userEmail })
  }
)

// Custom API error handler
app.use(apiErrorHandler)

export const router = express.Router()
