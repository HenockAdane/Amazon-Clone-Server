const userModel = require("../models/UserModel")
const bcrypt = require("bcrypt")
const sendMail = require("./SendMail")

class ListController {


    async createList(req,res, next){
        const {newListName, userID} = req.body

        try{
            const user = await userModel.findOne({_id: userID})



            user.lists = [{name: newListName, items: []}, ...user.lists]

            await user.save()

            res.status(200).send(user)

        } catch(error){
            console.log(error)
        }
    }

    async getAllListNames(req,res,next){
        const {userID} = req.params
        
        try{
            const user = await userModel.findOne({_id: userID})

            const listNames = user.lists.map(list => list.name)

            res.status(200).send({listNames: listNames})
        } catch(error){
            console.log(error)
        }
    }

    async getListByName(req,res,next){
         const {userID, listName} = req.params
         console.log("name")

         try{
            console.log(1)
            const user = await userModel.findOne({_id: userID})

            const list = user.lists.filter(list => list.name === listName)

            console.log(2)

            res.status(200).send({list: list})

         } catch(error){

            res.status(500).send()

         }
    }

    async addToList(req,res,next){
        const {userID, product, listName} = req.body
        
        console.log(1)
        try{
            //get user
            const user = await userModel.findOne({_id: userID})

            const filteredList = user.lists.filter(list => list.name === listName)

            console.log(filteredList)

            let exists =  filteredList[0].items.find(item => item._id === product._id)

            if (exists){
                res.status(200).send({message: "This item has already been saved to this list"})
            }

            else{
                //map through the current lists array in the user object and modify and add to the list item in the array that contains the same name as the listname provided by the client
                user.lists =  user.lists.map(list => list.name === listName ? {...list, items: [product, ...list.items]} : list)

                user.save()

                res.status(200).send({success: true})
                console.log("item added to list")
            }

        } catch(error){
            console.log(error)
            res.status(500).send()
        }

    }

    
}


module.exports = new ListController()