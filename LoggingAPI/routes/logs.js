const express = require('express');
const router = express.Router();
const {db} = require('../services/database');

router.get('/', async function(req, res, next) {
    const logs = await db.collection('logs').find().toArray();
    res.send(logs);
});

router.post('/', function(req, res, next) {
    db.collection('logs').insertOne(req.body)
        .then((user) => res.status(201).json({'id': user.insertedId}))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;