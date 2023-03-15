import mongoose from 'mongoose'

export interface ParsedToken {
  payload: {
    email: string
    email_verified: string
    name: string
    picture: string
    given_name: string
    family_name: string
    locale: string
  }
}

export interface VerifiedCallback {
  (error: any, user?: any, info?: any): void
}

export type UserDocument = Document & {
  _id?: mongoose.Schema.Types.ObjectId
  first_name?: string
  last_name?: string
  email: string
  password: string
  isAdmin?: boolean
}
export type ProductDocument = Document & {
  _id?: mongoose.Schema.Types.ObjectId
  name?: string
  color?: string
  size?: string
  price?: number
  img?: string
}
