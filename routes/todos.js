const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

//GET
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.json({message: err});
    }
});

//POST
router.post('/', async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        priority: req.body.priority,
        done: req.body.done
    });

    todo.save()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({message: err});
        })
});

module.exports = router;