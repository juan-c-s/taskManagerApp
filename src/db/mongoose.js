const mongoose = require('mongoose');
const User = require('../models/user')
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


// const me = new User({
//     name: 'jefferson',
//     email: 'jeff@gmail.com      ',
//     password: 'juan12102'
// })
// me.save().then(() => {
//     console.log(me)
// }).catch(err => {
//     console.log(err)
// })

//These models are like java classes where you specify the atributes

// const task1 = new Task({
//     completed: true
// })
// task1.save().then(() => {
//     console.log(task1)
// }).catch(err => {
//     console.log(err)
// })