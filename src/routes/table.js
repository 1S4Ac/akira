const router = require('express').Router()
const tableController = require('../controllers/table')

router.post('/add', tableController.add)

module.exports = router