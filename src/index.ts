import errorHandler from 'errorhandler'
import mongoose from 'mongoose'
import { app } from './app'
import { MONGODB_URI } from './util/secrets'
import logger from './util/logger'

const mongoUrl = MONGODB_URI

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
if (typeof app.get('port') !== 'undefined') {
  app.listen(app.get('port'), () => {
    console.log(
      'App is running at http://localhost:%d in %s mode',
      app.get('port'),
      app.get('env')
    )
    console.log('Press CTRL-C to stop\n')
  })
} else {
  console.error(
    'Port is not defined. Please set the PORT environment variable.'
  )
}

export default server
