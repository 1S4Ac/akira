const router = require('express').Router();
const userController = require('../controllers/user');
const { list, add, get, change, remove } = userController;

router.get('/', list);
router.post('/', add);
router.get('/:id', get);
router.put('/:id', change);
router.delete('/:id', remove);

module.exports = router;
