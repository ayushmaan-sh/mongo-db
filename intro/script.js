const express = require("express")
const jwt = require("jsonwebtoken")
const {UserModel, TodoModel} = require("./db")
const mongoose = require("mongoose")

const JWT_SECRET = "ayushmaan"

mongoose.connect("mongodb+srv://ayushmaanshukla274:Ayush24@cluster0.2lqbam1.mongodb.net/todo-app")

const app = express()
app.use(express.json())

app.post("/signup", async function(req, res){
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name

    await UserModel.create({
        email: email,
        password: password,
        name: name
    })

    res.json({
        message: "You are logged in."
    })
})

app.post("/signin", async function(req, res){
    const email = req.body.email
    const password = req.body.password

    const user = await UserModel.findOne({
        email: email,
        password: password
    })

    if(user){
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_SECRET)
        res.json({
            message: "Signned In!",
            token: token
        })
    } else {
        res.json({
            message: "Incorrect credentials."
        })
    }
})

auth = (req, res, next) => {
    const token = req.headers.token
    const decodedInformation = jwt.verify(token, JWT_SECRET)

    if(decodedInformation){
        req.userId = decodedInformation.id
        next()
    } else {
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
}

//create todo
app.post("/todo", auth, function(req, res){
    const userId = req.userId
    const title = req.body.title

    TodoModel.create({
        title,
        userId
    })

    res.json({
        userId: userId,
        message: "Todo Created!"
    })
})

//get the existing todos from the database
app.get("/todos", auth, async function(req, res){
    const userId = req.userId
    const title = req.body.title

    const todos = await TodoModel.find({
        userId: userId
    })

    res.json({
        todos: todos
    })
})

app.listen(3000)
