// Create the mongoose model for user and then it should already work for the AuthController

const { Timestamp } = require("mongodb")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmationCode: {
        type: Object,
        required: false
    },
    confirmed: {
        type: Boolean,
        required: true
    },
    // amazonPrime: {
    //     type: Object,
    //     required: true
    // },
    orders: {
        type: Array,
        required: true
    },
    savedProducts: {
        type: Array,
        required: true
    },
    deliveryAddress:{
        type: Object,
        required: false
    },
    createdAt: {
        type: Date,
        required: true
    }
}, {timestamps: true})


const userModel = mongoose.model("user", userSchema)

module.exports = userModel

//amazonPrimeMember,
// orders: {product, dateOrdered, estimated arival time}