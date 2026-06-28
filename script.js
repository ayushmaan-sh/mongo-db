const express =  require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const { UserModel } = require("./db")

const app = express()
const JWT_SECRET = "ayushmaan"

mongoose.connect("mongodb+srv://ayushmaanshukla274:Ayush24@cluster0.2lqbam1.mongodb.net/myCourseApp")

app.use(express.json())

app.post("/signup", async(req, res)=>{
    const username = req.body.username
    const password = req.body.password

    const checkExistingUser = await UserModel.findOne({username})

    if(!checkExistingUser){
        res.json("Signed up")
    } else {
        res.json("User already in data.")
    }
})

app.listen(3000)