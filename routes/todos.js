const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.json({ message: err });
    }
});

// POST
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
            res.json({ message: err });
        })
});

// PUT
router.put('/', async (req, res) => {
    const todo = new Todo({
        _id: req.body._id,
        text: req.body.text,
        priority: req.body.priority,
        done: req.body.done
    });
    
    let updatedTodo = null;

    Todo.findOneAndUpdate(
        { _id: todo._id },
        todo,
        { new: true },
        function (err, res) {
            updatedTodo = res;
        }
    );

    res.json(updatedTodo);
});

// DELETE
router.delete('/:id', async (req, res) => {
    const idToDelete = req.params.id;

    Todo.findByIdAndDelete(idToDelete, function (err) {
        if (err) {
            res.json('Couldn\'t delete TODO');
        } else {
            res.json(true);
        }
    });
});

module.exports = router;