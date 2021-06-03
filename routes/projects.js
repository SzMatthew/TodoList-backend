const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// GET
router.get('/', async (req, res) => {
    try {
        const project = await Project.find();
        res.json(project);
    } catch (err) {
        res.json({ message: err });
    }
});

// POST
router.post('/', async (req, res) => {
    const project = new Project({
        title: req.body.title
    });

    project.save()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({ message: err });
        })
});

module.exports = router;