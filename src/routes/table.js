const router = require('express').Router()
const tableController = require('../controllers/table')

router.post('/', tableController.add)
router.get('/list', tableController.list)
router.get('/:id', tableController.get)
router.post('/change', tableController.change)
router.post('/remove', tableController.remove)

module.exports = router