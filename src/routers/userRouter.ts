import express from 'express'
import {
  deleteUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  loginUser,
  signupUser,
} from '../controllers/user.controller'

const router = express.Router()

router.post('/login', loginUser)
router.post('/signup', signupUser)
router.get('/users', getAllUsers)
router.get('/users/:id', findUserById)
router.post('/userbyemail', findUserByEmail)
router.delete('/users/:id', deleteUser)
export default router
