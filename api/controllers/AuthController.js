const BaseController = require('./BaseController');
const userService = require('../services/UserService');
const userModel = require("../models/UserModel")
const bcrypt = require("bcrypt")
const sendMail = require("./SendMail")

/*
  Has all the network logic
*/
class AuthController{
    // route handler
    async signIn(req, res, next){
      const { email, password } = req.body;

      //check if a user with

      try{
        //checking if a user with this email address already exists
        const user = await userModel.findOne({email: email})

        //user does exist
        if (user){

          //checking if the passwords match 
          const doesPasswordMatch = await bcrypt.compare(password, user.password)

          if (doesPasswordMatch){
            res.status(200).send({user:user})
          }

          else{
            res.status(200).send({message: "Either The Email Or Password Doesn't Match"})
          }
        }

        else{
          res.status(200).send({message: "Either The Email Or Password Doesn't Match"})
        }
       

      } catch(error){
        console.log(error)
      }
      
    }


    async signUp(req,res,next){
        let {name, email, password} = req.body

        email = email.toLowerCase()

           try{
             //checking if a user with this email address already exists
             const doesUserExist = await userModel.findOne({email: email})

            //user does exist
            if (doesUserExist){
                res.status(200).send({message: "A User With This Email Address Already Exists"})
            }

            //user does not exist
            else{

                //hashed the password to make it secure
                const hashedPassword = await bcrypt.hash(password, 10)

                //generating a random confirmation code with the combination of a-z0-9, for a length for 50. The confirmation code will have a short expirey period of 5 minutes to make it even more secure against brute attempts
                let randomConfirmationCode = ""
                const options = "abcdefghijklmnopqrstuvwxyz0123456789"

                while (randomConfirmationCode.length < 50){
                    randomConfirmationCode+= options[Math.floor(Math.random() * options.length)]
                }

                const user = new userModel({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    confirmationCode: {
                        value: randomConfirmationCode,
                        createdAt: new Date().getTime()
                    },
                    confirmed: false,
                    orders: [],
                    lists: [],
                    createdAt: new Date()
                })

                await user.save()

                const to= email,
                subject= "Confirmation Code",
                html=`<b><p>This Code Will Expire In 5 Minutes. If The Code Has Expired, Please Request For A New One.</p>
                <p>Confirmation Code:${randomConfirmationCode}</p></b>`

                const mailInfo = await sendMail(to,subject,html)
                if (mailInfo){
                  console.log("Message sent: %s", mailInfo.messageId);
                }                
                res.status(200).send({user: user})
                console.log("user has been saved")

            }
          } catch(error){
            console.log(error)
          }

    }

    async confirmAccount(req,res,next){
      const {userID, attemptedCode, attemptedTime} = req.body
      try{
        const user = await userModel.findOne({_id : userID})

        if (!user){
          res.status(404).send({message: "This User Does Not Exist"})
        }

        const {confirmationCode} = user

        if (confirmationCode.value === attemptedCode && attemptedTime - confirmationCode.createdAt <= 300000){
          user.confirmed = true
          user.confirmationCode = null
          await user.save()
          console.log("user has been confirmed")
          res.status(200).send({user: user})
        }

        else{
          res.status(200).send({message: "The Confirmation Code Is Either Incorrect Or Expired"})
        }
      } catch(error){
        console.log(error)
        res.status(500).send()
      }
    }

    async resendConfirmationCode(req,res,next){
      const {userID} = req.body
      try{
          const user = await userModel.findOne({_id: userID})

          if (user){
            res.status(404).send({message: "This User Does Not Exist"})
          }
          
          else{
              //generating a random confirmation code with the combination of a-z0-9, for a length for 50. The confirmation code will have a short expirey period of 5 minutes to make it even more secure against brute attempts
              let randomConfirmationCode = ""
              const options = "abcdefghijklmnopqrstuvwxyz0123456789"
              while (randomConfirmationCode.length < 50){
              randomConfirmationCode+= options[Math.floor(Math.random() * options.length)]
            }

            user.confirmationCode = {
              value: randomConfirmationCode,
              createdAt: new Date().getTime()
            }

            await user.save()
            const to= email,
            subject= "New Confirmation Code",
            html=`<b><p>This Code Will Expire In 5 Minutes. If The Code Has Expired, Please Request For A New One.</p>
            <p>Confirmation Code:${randomConfirmationCode}</p></b>`

            const mailInfo = await sendMail(to,subject,html)
            if (mailInfo){
              console.log("Message sent: %s", mailInfo.messageId);
            }                
            res.status(200).send({user: user})
            console.log("user has been saved")


          }
        } catch(error){
          console.log(error)
          res.status(500).send()
        }

        
      
    }

    async updateName(req,res,next){
      const {newName, userID} = req.body

      try{

          const user = await userModel.findOne({_id: userID})

          if (!user){
              throw new Error("There has been an unexpeceted error at updateName")
          }

          user.name = newName

          await user.save()

          const to = user.email,
          subject = "Name Change On Amazon Clone",
          html = "Hey your name on amazon clone has been changed"

          const mailInfo = await sendMail(to,subject,html)
              if (mailInfo){
                console.log("Message sent: %s", mailInfo.messageId);
              }       

          console.log("user name has been updated")

          res.status(200).send(user)




      } catch(error){
          console.log(error)
          res.status(500).send()
      }
      
  }

  async updateEmail(req,res,next){
      const {newEmail, userID} = req.body

      try{

          const user = await userModel.findOne({_id: userID})

          if (!user){
              throw new Error("There has been an unexpeceted error at updateName")
          }

          let randomConfirmationCode = ""
          const options = "abcdefghijklmnopqrstuvwxyz0123456789"

          while (randomConfirmationCode.length < 50){
              randomConfirmationCode+= options[Math.floor(Math.random() * options.length)]
          }

          user.email = newEmail
          user.confirmed = false
          user.confirmationCode =  {
              value: randomConfirmationCode,
              createdAt: new Date().getTime()
          }

          await user.save()

          const to= user.email,
          subject= "Email Change On Amazon Clone",
          html=`<b><p>Hey, your account email has been changed on amazon clone and needs to be reconfirmed. This Code Will Expire In 5 Minutes. If The Code Has Expired, Please Request For A New One.</p>
          <p>Confirmation Code:${randomConfirmationCode}</p></b>`

          const mailInfo = await sendMail(to,subject,html)
              if (mailInfo){
                console.log("Message sent: %s", mailInfo.messageId);
              }       

          console.log("user email has been updated")

          res.status(200).send(user)




      } catch(error){
          console.log(error)
          res.status(500).send()
      }
      
  }


  async updatePassword(req,res,next){
      const {currentPassword, newPassword, userID} = req.body

      try{
          const user = await userModel.findOne({_id : userID})

          //checking if the currentPassword submitted by the client matches the current password of this user
          const doesPasswordMatch = await bcrypt.compare(currentPassword, user.password)

          if (doesPasswordMatch){
              //password does match

              const hashedPassword = await bcrypt.hash(newPassword, 10)

              user.password = hashedPassword

              await user.save()

              const to = user.email,
              subject = "Password Change On Amazon Clone",
              html = "Hey your password on amazon clone has been changed"

              const mailInfo = await sendMail(to,subject,html)
              
              if (mailInfo){
                console.log("Message sent: %s", mailInfo.messageId);
              }

              console.log("user password has been updated")
              console.log(newPassword)
              res.status(200).send({user: user})
          }

          else{
              res.status(200).send({message: "The passwords do not match"})
          }



      } catch(error){
          console.log(error)

          res.status(500).send()
      }
  }
}


module.exports = new AuthController()

