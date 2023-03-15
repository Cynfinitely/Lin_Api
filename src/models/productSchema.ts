import mongoose from 'mongoose'
import { ProductDocument } from '../types'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'Name must be at least 3 chars'],
  },
  color: {
    type: String,
    required: true,
    minlength: [2, 'Color must be at least 2 chars'],
  },
  size: {
    type: String,
    required: true,
    enum: {
      values: ['Small', 'Medium', 'Large'],
      message: '{VALUE} is not supported',
    },
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    validate: {
      validator: (val: any) =>
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/.test(
          val
        ),
      message: 'Please enter correct url!',
    },
  },
})

export default mongoose.model<ProductDocument>('Product', productSchema)
