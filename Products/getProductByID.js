const productModel = require("../Models/productModel")


const getProductByID = (app) => {
    app.get("/shop/product/:productID", (req,res) => {
       const {productID} = req.params
console.log(productID)
       productModel.findOne({_id: productID}).then(doc => {

           res.status(200).send(doc)
       }).catch(err => {
           console.log(err)
           res.status(500).send()
       })
    })


}

module.exports = getProductByID