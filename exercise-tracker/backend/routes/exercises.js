const router = require('express').Router();
//const Exercise = require('../models/exercise.model');
let Exercises = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercises.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercises({
        username,
        description,
        duration,
        date
    });

    newExercise.save()
        .then(() => res.json('New Exercise Added'))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').get((req, res) => {
    const id = req.params.id;

    Exercises.findById(id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    const id = req.params.id;

    Exercises.findByIdAndDelete(id)
        .then(() => res.json('Exercise deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').patch((req, res) => {
    const id = req.params.id;

    Exercises.findByIdAndUpdate(id, {$set: req.body})
        .then(exercise => {
            exercise.save()
            .then(() => res.json('Exercise updated'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;