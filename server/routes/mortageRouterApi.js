const Router = require('express');

const { authMiddlewares, bankMiddlewares, userMiddlewares } = require('../middlewares');
const mortageController = require('../controllers/mortageController');

const router = new Router();

router.use('/:user_id',
    authMiddlewares.checkAccessToken, userMiddlewares.checkUserRole(['admin'],
        userMiddlewares.getUserByDynamicParam('user_id', 'params', '_id'),
        userMiddlewares.isUserByIdExist));

router.post('/:user_id/:bank_id',
    bankMiddlewares.getBankByDynamicParam('bank_id', 'params', '_id'),
    bankMiddlewares.isBankByIdExist, mortageController.createMortage);
router.get('/:user_id', mortageController.getAllMortages);
router.delete('/:user_id/:id', authMiddlewares.checkAccessToken, mortageController.deleteMortageById);

module.exports = router;
