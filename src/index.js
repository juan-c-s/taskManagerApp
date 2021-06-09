const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.PORT || 3000

//This means that express will parse any incoming json info to an object to access it 
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// const jwt = require('jsonwebtoken')
// const myFunction = async () => {
//     const token = jwt.sign({ _id: 01234 }, 'tomorrowland', { expiresIn: '7 days' });
//     console.log(token)
//     const verify = jwt.verify(token, 'tomorrowland')
// }
// myFunction()


app.listen(port, () => console.log('listening on port ' + port))