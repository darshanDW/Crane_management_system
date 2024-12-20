const express = require('express');
const { auth_middleware } = require('./middleware');

const router = express.Router();

router.get('/', auth_middleware, (req, res) => {
    res.send("CranesPage route");
});

module.exports = router;    