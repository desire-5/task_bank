const Router = require('express');

const { authMiddlewares, userMiddlewares, bankMiddlewares } = require('../middlewares');
const bankController = require('../controllers/bankController');

const router = new Router();

router.use('/:bank_id',
    authMiddlewares.checkAccessToken, userMiddlewares.checkUserRole(['admin'],
        bankMiddlewares.getBankByDynamicParam('bank_id', 'params', '_id'),
        bankMiddlewares.isBankByIdExist));

router.use('/',
    authMiddlewares.checkAccessToken, userMiddlewares.checkUserRole(['admin']));

router.get('/:bank_id', bankController.getBankById);
router.get('/', bankController.getAllBanks);
router.delete('/:bank_id', bankController.deleteBankById);
router.post('/', bankController.createBank);
// router.put('/:bank_id', bankMiddlewares.isValidBankDataUpd, bankController.updateBank);

module.exports = router;
