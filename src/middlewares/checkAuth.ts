import { NextFunction, Request, Response } from 'express'
import { ForbiddenError } from '../helpers/apiError'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'

type Role = 'ADMIN' | 'USER'

export default function (
  req: Request,
  res: Response,
  next: NextFunction,
  role: Role
) {
  try {
    console.log('role:', role)
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1]

      const decodedUser = jwt.verify(token, JWT_SECRET)

      console.log(decodedUser)

      req.user = decodedUser
      return next()
    }
    throw new ForbiddenError()
  } catch (error) {
    throw new ForbiddenError()
  }
}
