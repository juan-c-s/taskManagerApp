const express = require('express')
const router = express.Router()
const Task = require('../models/task')

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        const taskk = await task.save()
        res.send(taskk)
    } catch (e) {
        res.status(400).send(e)
    }

    //400 status code is a client error
})
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        if (!tasks)
            res.status(404).send('no tasks found')
        res.send(tasks)
    } catch (e) {
        res.status(401).send(e)
    }
    // Task.find({}).then((tasks) => {
    //     if (!tasks) {
    //         return res.status(404).send("No tasks")
    //     }
    //     res.send(tasks)
    // }).catch(err => res.status(401).send(err))
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task)
            res.status(404).send('no task found')
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})
//updating specific task
router.patch("/tasks/:id", async (req, res) => {
    const updateKeys = Object.keys(req.body)
    const validKeys = ["completed", "description"]
    const isvalidKey = updateKeys.every(key => validKeys.includes(key))

    if (!isvalidKey)
        return res.status(400).send({ error: "invalid Key" })
    try {
        const task = await Task.findById(req.params.id)
        updateKeys.every(update => task[update] = req.body[update])
        await task.save()
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task)
            return res.status(400).send({ error: "task not Valid" })
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            res.status(404).send({ error: "task not found" })
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router