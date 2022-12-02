const router = require('express').Router()
const tableController = require('../controllers/table')

router.post('/add', tableController.add)
router.post('product', () => {})

module.exports = router