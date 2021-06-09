
const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {

        await user.save()
        const token = await user.generateAuthToken()
        res.send({ user, token })
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }

    // user.save().then(() => {
    //     res.send(user)
    // }).catch(err => {
    //     res.status(400).send(err)
    //     //replaced by upper line res.send(err)
    // })

})
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    }
    catch (e) {
        res.status(500).send(e)
    }
    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch(err => res.status(500).send(err))
})
//500 status code is a server error
router.get('/users/:id', async (req, res) => {

    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            res.status(404).send('userNotFound')
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }

})
const deleteAndCountUncompleteTasks = async (id) => {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}
// try{

// }catch(e){
//     res.status(500).send(e)
// }
//update user
router.patch('/users/:id', async (req, res) => {
    const updateKeys = Object.keys(req.body)
    const allowedKeys = ['name', 'age', 'password', 'email']
    const exists = updateKeys.every(key => allowedKeys.includes(key))
    if (!exists) {
        return res.status(400).send({ error: 'key not valid' })
    }

    try {

        const user = await User.findById(req.params.id)
        if (!user)
            return res.status(400).send({ error: "user cannot be created" })

        updateKeys.forEach((update) => user[update] = req.body[update])
        await user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }

})
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user)
            return res.status(400).send();
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})
module.exports = router