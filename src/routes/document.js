const router = require('express').Router()

router.get('/', documentController.add)
router.get('/:id', documentController.get)
router.post('/', documentController.list)
router.put('/:id', documentController.change)
router.delete('/:id', documentController.remove)

module.exports = router