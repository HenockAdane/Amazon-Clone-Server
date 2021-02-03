const userModel = require("../Models/userModel")

const SignIn = (app) => {
    app.post("/signin", (req,res)=> {

        const {email, password} = req.body

        userModel.findOne({email: email}).then(doc => {

            if (doc){
                //a user with this email address does exist

                bcrypt.compare
            }

            else{
                //a user with this email address does not exist
            }
        })
    })
}
