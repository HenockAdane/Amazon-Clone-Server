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
}


module.exports = new ProductController()