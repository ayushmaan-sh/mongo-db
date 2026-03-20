const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

//User Data
const User = new Schema({
    email: {type: String, unique: true},
    password: String,
    name: String
})

//Todo Data
const Todo = new Schema({
    title: String,
    done: Boolean,
    userId: ObjectId
})

//Adding data into collections
const UserModel = mongoose.model('users', User)
const TodoModel = mongoose.model('todos', Todo)

//exporting data to the backend
module.exports = {
    UserModel,
    TodoModel
}
