//importing modules
const express = require('express')
const indexController = require('../controllers/indexController')
const { pong } = indexController

const router = express.Router()

//ping -> pong endpoint
router.post('/ping', pong)

module.exports = router