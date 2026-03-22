const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const { UserModel, MyCoursesModel, CreateCourseModel } = require("./db")

mongoose.connect("mongodb+srv://ayushmaanshukla274:Ayush24@cluster0.2lqbam1.mongodb.net/myApp")

const JWT_SECRET = "courseApp"

const app = express()

app.use(express.json())
app.use(express.static(__dirname + "/public"))

app.get("/coursehub.com", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

// Signup Endpoint
app.post("/coursehub.com/signup", async function (req, res) {

    try {
        const email = req.body.email
        const username = req.body.username
        const password = req.body.password

        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.json("User Already Exist.")
        }

        await UserModel.create({
            email: email,
            username: username,
            password: password
        })

        res.json({
            message: "Signed up! User added to database."
        })

    } catch (error) {
        res.json("Server Error")
    }

})


// Signin Endpoint
app.post("/coursehub.com/signin", async function (req, res) {
    const email = req.body.email
    const password = req.body.password

    try {
        const user = await UserModel.findOne({
            email: email,
            password: password
        })

        if (user) {
            const token = jwt.sign({
                id: user._id.toString()
            }, JWT_SECRET)

            res.json({
                token: token,
                message: "Signed In"
            })
        } else {
            return res.status(403).json({
                message: "Invalid credentials"
            })
        }
    } catch (error) {
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
})


// Authentication
const auth = (req, res, next) => {
    const token = req.headers.token;
    try {
        const decodedInformation = jwt.verify(token, JWT_SECRET);
        req.userId = decodedInformation.id;
        next();
    } catch (err) {
        res.status(401).json({
            message: "Unauthorized Request!"
        });
    }
};


//My Courses
app.get("/coursehub.com/mycourses", auth, async function (req, res) {
    const courses = await MyCoursesModel.findOne({
        userId: req.userId
    })

    if (!courses) {
        return res.json({
            message: "You do not purchased any course yet."
        })
    } else {
        res.json({
            message: "You courses:",
            courses: courses
        })
    }
})

// Purchase a course
app.post("/coursehub.com/purchasecourse", auth, async function (req, res) {
    const courseName = req.body.courseName
    const instructor = req.body.instructor
    const done = req.body.done

    await MyCoursesModel.create({
        courseName: courseName,
        instructor: instructor,
        done: done,
        userId: req.userId
    })

    res.json("You've purchased this course.")
})


// Create a course
app.post("/coursehub.com/createCourse", async function (req, res) {
    const courseName = req.body.courseName
    const instructor = req.body.instructor
    const duration = req.body.duration
    const price = req.body.price

    const course = await CreateCourseModel.create({
        courseName: courseName,
        instructor: instructor,
        duration: duration,
        price: price
    })

    res.json("Course Added!")
})

app.listen(4000)
