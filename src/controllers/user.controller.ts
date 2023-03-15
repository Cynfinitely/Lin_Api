import { Request, Response } from 'express'
import User from '../models/userSchema'
import jwt from 'jsonwebtoken'

export const createToken = (_id: any) => {
  const secretKey: any = process.env.JWT_SECRET
  return jwt.sign({ _id }, secretKey, { expiresIn: '3d' })
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user: any = await User.findOne({
      email: req.body.email,
    })
    if (!user.password === req.body.password) {
      return res.status(400).json({ message: 'Invalid password' })
    }
    const token = createToken(user._id)
    return res.status(200).json({
      userToken: token,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      id: user.id,
    })
  } catch (error) {
    return res.status(400).json({ error: 'email doesn\'t exist.' })
  }
}

export const signupUser = async (req: Request, res: Response) => {
  try {
    const email = req.body.email
    const exists: any = await User.findOne({ email: email })
    if (exists) {
      console.log('User already exist.')
      return res.json({ error: 'User already exist' })
    }
    const user = await User.create(req.body)
    const token = createToken(user._id)

    res.json({
      userToken: token,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      id: user.id,
    })
  } catch (error) {
    res.status(400).json(error)
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find()
  res.json(users)
}

export const findUserById = async (req: Request, res: Response) => {
  User.findOne({ _id: req.params.id })
    .then((singleUser) => res.json({ user: singleUser }))
    .catch((err) => res.status(400).json(err))
}
export const findUserByEmail = async (req: Request, res: Response) => {
  User.findOne({ email: req.body.email })
    .then((singleUser) => res.json({ user: singleUser }))
    .catch((err) => res.status(400).json(err))
}

export const deleteUser = async (req: Request, res: Response) => {
  User.deleteOne({ _id: req.params.id })
    .then((deletedUser) => res.json({ user: deletedUser }))
    .catch((err) => res.json({ message: 'something went wrong', error: err }))
}
