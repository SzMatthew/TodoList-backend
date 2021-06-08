const express = require('express');
const Todo = require('../models/Todo');
const Project = require('../models/Project');
const router = express.Router();

// GET
router.get('/getTodosByProjectId', async (req, res) => {
    try {
        const todos = await Todo.find({ projectId: req.query.projectId }).exec();
        const project = await Project.findById(req.query.projectId).exec();
        res.json({
            projectTitle: project.title,
            todos
        });
    } catch (err) {
        res.json({ message: err });
    }
});

// POST
router.post('/', async (req, res) => {
    const todo = new Todo({
        projectId: req.body.projectId,
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
        projectId: req.body.projectId,
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