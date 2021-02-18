const productModel = require("../models/ProductModel")

class ProductController {

    async getProductsByCategory(req,res,next){

        const {category} = req.params

        try{
            const products = await productModel.find({category: category})
            if (products.length > 0){
            res.status(200).send(products)
            }

            else{
                res.status(404).send()
            }
        } catch(error){
            console.log(error)
            res.status(500).send()
        }
    }

    async getProductByID(req,res,next){
        const {productID} = req.params
        try{
            const product = await productModel.findOne({_id: productID})

            if (product){
                res.status(200).send(product)
            }

            else{
                res.status(404).send()
            }
        } catch(error){
            console.log(error)
            res.status(500).send()
        }
    }

    async getProductBySearch(req,res,next){

        const {value} = req.params

        try{
            const products = await productModel.find({ $or: [
                { name: { $regex: value, $options: 'i' } },
                { category: { $regex: value, $options: 'i' } }
              ] }).limit(10)
              
            if (products.length < 1){
                res.status(200).send({products: []})            
            }
    
            else{
                res.status(200).send({products: products})
            }

        } catch(error){
            console.log(error)
        }
    }


    async postReview(req,res,next){
        const {productID, userID, stars, headline, written} = req.body
        console.log(req.body)

        try{
            const product = await productModel.findOne({_id: productID})

            const existingProduct = product.reviews.find(review => review.authorID === userID)

            if (existingProduct){
                product.reviews = product.reviews.map(review => review === existingProduct ? {...review, stars: stars, headline: headline, written: written} : review)
            }

            else{
                product.reviews = [...product.reviews, {authorID: userID, stars: stars, headline: headline, written: written}]
            }


            await product.save()

            res.status(200).send()
        } catch(error){
            console.log(error)
            res.status(500).send()
        }
    }
}


module.exports = new ProductController()