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

    try {
        const checkExistingUser = await UserModel.findOne({username})
    
        if(!checkExistingUser){
            UserModel.create({
                username: username,
                password: password
            })
    
            res.json({
                message: "You are signed up."
            })
        } else {
            res.json("User already in data. Proceed to signin")
        }
        
    } catch (error) {
        res.json({
            error: error,
            message: "Something went wrong!"
        })
    }
})

app.post("/signin", async(req, res)=>{
    const username = req.body.username
    const password = req.body.password

    try {       
        const user = UserModel.findOne({
            username: username,
            password: password
        })
    
        if(user){
            const token = jwt.sign({username}, JWT_SECRET)   
            res.json({
                message: "Signed In",
                token: token
            })
        } else {
            message: "Invalid Credentials."
        }

    } catch (error) {
        res.json({
            error: error,
            message: "Something went wrong."
        })
    }

})


app.listen(3000)