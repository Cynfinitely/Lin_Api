import mongoose from 'mongoose'
import { UserDocument } from '../types'

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: false,
    minlength: [3, 'Name must be at least 3 chars'],
  },
  last_name: {
    type: String,
    required: false,
    minlength: [3, 'Name must be at least 3 chars'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    index: true,
    unique: true,
    validate: {
      validator: (val: any) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: 'Please enter a valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: 4,
    validate: {
      validator: (val: any) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(val),
      message:
        'Please enter minimum eight characters, at least one letter and one number',
    },
  },
  isAdmin: {
    type: Boolean,
    required: false,
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
