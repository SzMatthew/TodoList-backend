const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// #region GET
router.get('/', async (req, res) => {
    try {
        const project = await Project.find();
        res.json(project);
    } catch (err) {
        res.json({ message: err });
    }
});

// #endregion

// #region PUT
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

// #endregion

module.exports = router;