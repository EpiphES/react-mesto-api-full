const express = require('express');

const router = express.Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const {
  login, createUser, checkToken, logout,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { signInValidation, signUpValidation } = require('../middlewares/validation');
const { NotFoundError } = require('../errors');
const { pageNotFoundMessage } = require('../utils/constants');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', signInValidation, login);
router.post('/signup', signUpValidation, createUser);
router.get('/checktoken', checkToken);

router.use(auth);
router.get('/logout', logout);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use((req, res, next) => {
  next(new NotFoundError(pageNotFoundMessage));
});

module.exports = router;
