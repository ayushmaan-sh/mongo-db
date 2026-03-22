const mongoose = require("mongoose")
const Schema = mongoose.Schema

const User = new Schema({
    email: {type: String, unique: true},
    username: String,
    password: String
})

const MyCourses = new Schema({
    courseName: String,
    instructor: String,
    done: Boolean,
    userId: String
})

const CreateCourse = new Schema({
    courseName: String,
    instructor: String,
    duration: String,
    price: Number
})

const UserModel = mongoose.model("users", User)
const MyCoursesModel = mongoose.model("mycourses", MyCourses)
const CreateCourseModel = mongoose.model("createcourses", CreateCourse)

module.exports = {
    UserModel,
    MyCoursesModel,
    CreateCourseModel
}
