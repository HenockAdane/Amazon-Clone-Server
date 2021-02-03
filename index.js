require("dotenv/config")

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const apiRoutes = require('./api/routes/index');


async function bootstrap() {
    const PORT = process.env.PORT || 3001

    await mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {
        console.log('Something went wrong with the db connection.')
    });
    
    console.log("connected to database")

    const app = express();

    app.use(express.json());
    app.use(cors());

    // look into versioning (api/v1)
    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server is running in port: http://localhost:${PORT}`)
    });
}

bootstrap();




// const app = require("express")()
// const mongoose = require("mongoose")

// const port = process.env.PORT || 3001

// const productModel = require("./Models/productModel")


// const bodyParser = require("body-parser")
// //get the body parser

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// // allows to process data from the url and json

// const cors = require("cors")
// app.use(cors())

// const bcrypt = require("bcrypt")

// mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
    
//     app.listen(port, ()=> console.log(`Connected to the DataBase and port ${port}`))
// }).catch((err => console.log(err + "THIS IS THE ERROR")))

// const product = new productModel({
//     name: "Kenwood KMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl, Removable Splash Guard, 1000 W, Red",
//     images: ["https://images-na.ssl-images-amazon.com/images/I/61VFjSwFXWL._AC_SL1200_.jpg","https://images-na.ssl-images-amazon.com/images/I/61dTbv1AusL._AC_SL1200_.jpg","https://images-na.ssl-images-amazon.com/images/I/61sFlJPKbNL._AC_SL1200_.jpg","https://images-na.ssl-images-amazon.com/images/I/61FJtVQh9bL._AC_SL1200_.jpg"],
//     price: 321.00,
//     sizes: [],
//     description: [{
//         title: "Brand",
//         info: "Kenwood",
//     },{
//         title: "Colour",
//         info: "Red",
//     },{
//         title: "Power / Wattage",
//         info: "1000 watts",
//     },{
//         title:"Item Dimensions L x W x H",
//         info: "38.5 x 24 x 35.5 centimetres"
//     },{
//         title: "Number Of Speeds",
//         info: 6
//     },{
//         title: "Item Weight",
//         info: "9.1 Kilograms",
//     },{
//         title: "Dishwasher Safe?",
//         info: "Yes"
//     }],
//     seller: "Henock Adane",
//     category: "Kitchen",
//     reviews: []

// })

// const getProductByCategory = require("./Products/getProductByCategory")
// getProductByCategory(app)

// const getProductByID = require("./Products/getProductByID")
// getProductByID(app)

// product.save().then(res => {
//     console.log("product has been saved")
// }).catch(err => {
//     console.log(err)
// })