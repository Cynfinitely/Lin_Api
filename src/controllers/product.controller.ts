import { Request, Response } from 'express'
import Product from '../models/productSchema'

export const getProducts = function (req: Request, res: Response) {
  Product.find(function (err: any, allproducts: any) {
    if (err) {
      console.log(err)
    } else {
      res.json(allproducts)
    }
  })
}

export const findProductById = async function (req: Request, res: Response) {
  const id = req.params.id
  console.log(id)
  const product = await Product.findById(id)
  console.log(product)
  res.json(product)
}

export const addProduct = async function (req: Request, res: Response) {
  try {
    const proName = req.body.name
    console.log('here is proName', proName)
    const exists: any = await Product.findOne({ name: proName })
    console.log('there is exists', exists)
    if (exists) {
      return res.json({ error: 'Product already exists' })
    }
    console.log('REQ BODY:', req.body)
    const newProduct = await Product.create(req.body)
    console.log('newproduct->', newProduct)
    return res.json(newProduct)
  } catch (error) {
    return res.status(400).json(error)
  }
}

export const deleteProduct = function (req: Request, res: Response) {
  Product.deleteOne({ _id: req.params.id })
    .then((deletedProduct) => res.json({ product: deletedProduct }))
    .catch((err) => res.json({ message: 'something went wrong', error: err }))
}

export const updateProduct = async function (req: Request, res: Response) {
  try {
    const id = req.params.id
    console.log(id)
    Product.findByIdAndUpdate(id, req.body, { new: true })
      .then((updatedProduct) => res.json({ product: updatedProduct }))
      .catch((err) => res.status(400).json(err))
  } catch (error) {
    ;('error')
  }
}
