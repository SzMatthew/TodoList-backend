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

// #region POST
router.post('/insertProject', async (req, res) => {
    const project = new Project({
        title: req.body.title,
        userId: req.body.userId
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

// #region PUT
router.put('/updateProjectTitle', async (req, res) => {
    const project = new Project({
        _id: req.body.projectId,
        title: req.body.projectTitle
    });
    
    Project.findOneAndUpdate(
        { _id: project._id },
        project,
        { new: true },
        function (err, result) {
            res.json(result);
        }
    );
});
// #endregion

// #region DELETE

router.delete('/:id', async (req, res) => {
    const idToDelete = req.params.id;

    Project.findByIdAndDelete(idToDelete, function (err) {
        if (err) {
            res.json('Couldn\'t delete Project');
        } else {
            res.json(true);
        }
    });
});

// #endregion

module.exports = router;