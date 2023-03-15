import errorHandler from 'errorhandler'
import mongoose from 'mongoose'
import { app } from './app'
import { MONGODB_URI } from './util/secrets'
import logger from './util/logger'
import { Request, Response } from 'express'

const mongoUrl = MONGODB_URI
const port = process.env.PORT || 5000

mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((err: Error) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })

const server = mongoose.connection

/**
 * Error Handler. Provides error handing middleware
   only use in development
 */
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler())
}

// Start Express server
app.get('/', (_req: Request, res: Response) => {
  return res.send('Express Typescript on Vercel')
})

app.get('/ping', (_req: Request, res: Response) => {
  return res.send('pong 🏓')
})

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`)
})

