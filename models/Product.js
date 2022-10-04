const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String, 
      trim: true, 
      required: [true, 'Please enter product name'],
      maxlength: [100, 'Name can not be more than 100 characters']
    }, 
    price: {
      type: Number, 
      required: [true, 'Please enter a price'],
      default: 0
    }, 
    description: {
      type: String,
      maxlength: [1000, 'Description can not be more than 1000 characters']
    },
    image: {
      type: String, 
      default: '/uploads/example.jpeg'
    }, 
    media: {
      type: String, 
      enum: {
        values: ['LP', 'CD', 'MP3', 'Casette']
      }
    },
    user: {
      type: mongoose.Types.ObjectId, 
      ref: 'User',
      required: true
    }
  },
  {timestamps: true}
)

module.exports = mongoose.model('Product', ProductSchema)