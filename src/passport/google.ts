import GoogleTokenStrategy from 'passport-google-id-token'
import User from '../models/userSchema'
import { VerifiedCallback, ParsedToken } from '../types'
import { GOOGLE_CLIENT_ID } from '../util/secrets'

export default function () {
  return new GoogleTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
    },
    async (
      parsedToken: ParsedToken,
      googleId: string,
      done: VerifiedCallback
    ) => {
      try {
        console.log('parsed :', parsedToken)
        console.log('googleid:', googleId)
        const email = parsedToken.payload.email

        let user: any = await User.findOne({ email })
        console.log('this is email of user:', email)
        if (!user) {
          user = new User({
            email,
            isAdmin: email === 'celalyasinnari@gmail.com',
          })
          user.save()
        }
        return done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
}
