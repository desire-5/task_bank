const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddlewares, userMiddlewares } = require('../middlewares');

router.post(
    '/',
    userMiddlewares.getUserByDynamicParam('email'),
    userMiddlewares.isUserByIdExist,
    authController.login
);
router.post('/logout', authMiddlewares.checkAccessToken, authController.logout);
router.post('/logout_all_device', authMiddlewares.checkAccessToken, authController.logoutAllDevice);
router.post('/refresh', authMiddlewares.checkRefreshToken, authController.refreshToken);

module.exports = router;
