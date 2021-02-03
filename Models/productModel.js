const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = Schema({
    name: {
        type: String,
        required: true
    },
    images:{
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sizes: {
        type: Array,
        required: true
    },
    description:{
        type: Array,
        required: true
    },
    seller:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    reviews: {
        type:Array,
        required: true
    }
}, {timestamps: true})


const productModel = mongoose.model("product", productSchema)

module.exports = productModel