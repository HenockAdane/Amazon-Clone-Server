const productModel = require("../Models/productModel")


const getProductByCategory = (app) => {
    app.get("/shop/category/:category", (req,res) => {
       const {category} = req.params
console.log(category)
       productModel.find({category: category}).then(docs => {
           console.log(docs[0].price)
           res.status(200).send(docs)
       }).catch(err => {
           console.log(err)
           res.status(500).send()
       })
    })


}

module.exports = getProductByCategory