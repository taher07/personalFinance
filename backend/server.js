const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../build/')))

mongoose.connect(process.env.URI,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}).then(() => console.log('Connection finally estabilished')).catch(err => console.log(err))

const connection = mongoose.connection
connection.once('open',() => {
    console.log('MongoDB connected successfully')
})

entryRoute = require('./route')
app.use('/entry',entryRoute)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../build/index.html'));
});

const port = process.env.PORT || 3000
app.listen(port,() => {
    console.log(`server running on port ${port}`)
})