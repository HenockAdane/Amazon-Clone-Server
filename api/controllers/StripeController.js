const { default: Stripe } = require("stripe")
const userModel = require("../models/UserModel")


const stripe = require("stripe")(process.env.STRIPEKEY)

class StripeController {


    async processPayment(req,res,next){

        let { amount, paymentID, userID, products} = req.body
        console.log(req.body)

        try{
            const payment = await stripe.paymentIntents.create({
                amount: amount,
                currency: "GBP",
                description: "Product Payment",
                payment_method: paymentID,
                confirm: true
            })

            const user = await userModel.findOne({_id: userID})

            user.orders = [{
                datePlaced: new Date(),
                totalPrice: amount  / 100,
                payment: {intent: payment.id ,method: paymentID, currency: "GBP"},
                products: products
            }, ...user.orders]

            console.log(user.orders)

            await user.save()

            console.log(user)
            console.log(payment)

            res.status(200).send({
                user: user,
                success: true
            })

        } catch(error){

            res.status(500).send()
            console.log(error)
        }
        
    }

    async refundOne(req,res,next){
        const {userID, paymentID, productID, refundAmount} = req.body

        try{

            const user = await userModel.findOne({_id: userID})

            const order = user.orders.find(order => order.payment.method === paymentID)

            order.products = order.products.filter(product => product._id !== productID)
            order.totalPrice = order.totalPrice - refundAmount

            // user.orders.map(order => order ===)



        } catch(error){
            console.log(error)
        }
    }

    async refundAll(req,res,next){
        const {userID, intentID} = req.body

        try{

            const user = await userModel.findOne({_id: userID})

            const refund = await stripe.refunds.create({
                payment_intent: intentID
            });

            user.orders = user.orders.filter(order => order.payment.intent !== intentID)

            await user.save()

            res.status(200).send({success: true})

        } catch(error){
            console.log(error)
        }
    }


}

module.exports = new StripeController()