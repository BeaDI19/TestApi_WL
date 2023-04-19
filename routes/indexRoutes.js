//importing modules
const express = require('express')
const router = express.Router();
const { pong } = require('../controllers/indexController');

//ping -> pong endpoint
router.get('/ping', function(req,res){pong(req,res)})

module.exports = router;