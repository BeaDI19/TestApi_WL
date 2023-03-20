//importing modules
const { create } = require('domain')
const express = require('express')
const categoryController = require('../controllers/categoryController')
const {  
    getAll,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
} = categoryController

const router = express.Router()

router.get('/categories/get-all',getAll)

//login route
router.post('/categories/create', createCategory)

// users?query=
router.get('/categories/:name', getCategory)

router.put('/users/:name', updateCategory)

router.delete('/users/:name', deleteCategory)

module.exports = router