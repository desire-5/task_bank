const Router = require('express');

const { authMiddlewares } = require('../middlewares');
const userControllers = require('../controllers/userController');
const {
    checkUserRole, getUserByDynamicParam, isValidUserData, isValidUserDataUpd, isUserByIdExist, isMailExist
} = require('../middlewares/user_middleware');

const router = new Router();

router.use('/:user_id',
    authMiddlewares.checkAccessToken, checkUserRole(['admin']),
    getUserByDynamicParam('user_id', 'params', '_id'), isUserByIdExist);

router.get('/:user_id', userControllers.getUserById);
router.get('/', authMiddlewares.checkAccessToken, checkUserRole(['admin']), userControllers.getAllUsers);
router.delete('/:user_id', userControllers.deleteUserById);
router.post('/', isValidUserData, getUserByDynamicParam('email'), isMailExist, userControllers.createUser);
router.put('/:user_id', isValidUserDataUpd, userControllers.updateUser);

module.exports = router;
