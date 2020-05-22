const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
    name: String,
    price : {type: Number, default:0},
    category: {type: String, enum :['foots','tegnology','home']},
    image: String

})
module.exports = mongoose.model('product',ProductSchema)