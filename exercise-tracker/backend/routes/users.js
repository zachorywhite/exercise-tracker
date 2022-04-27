const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/:username').get((req, res) => {
//     const username2 = req.params.username;

//     User.find({username: username2})
//         .then(user => res.json(user))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;