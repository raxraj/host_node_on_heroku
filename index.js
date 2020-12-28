const express = require('express')
const mongoose = require('mongoose')

// Get Environment Variables from dotenv
require('dotenv').config()

// connect to MongoDB
mongoose.connect(
    process.env.MONGO_DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.error('Error in connecting to MongoDB.')
            return;
        }
        console.log('Connected to MongoDB.')
    }
)

// Import Mongoose Model
const todoModel = require('./models/todo')

// Get App Instance
const app = express()

app.get('/showTodos', (req, res) => {
    todoModel.find({}, (err, todos) => {
        if (err) {
            return res.send('Unknown Error in Fetching Todos')
        }
        return res.send(todos)

    })
})

app.post('/addTodo', (req, res) => {
    new todoModel(req.body)
        .save()
        .then(
            (createdTodo) => { return res.send({ message: 'Todo Created', createdTodo }) },
            (reason) => { return res.status(400).send({ message: 'Todo creation error', reason }) }
        )
})

// Setup middleware for the express
app.use(express.urlencoded({ extended: false }))

// Open Listening to the server
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on Port ${process.env.PORT}`)
})