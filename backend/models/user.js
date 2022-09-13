const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { AuthorizationError } = require('../errors');
const { wrongEmailOrPasswordMessage, urlRegex } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: 'Введите правильный url',
    },
  },
  email: {
    type: String,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Введите правильный email',
    },
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true,
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Поле "password" должно быть заполнено'],
  },
}, { versionKey: false });

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new AuthorizationError(wrongEmailOrPasswordMessage);
    })
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new AuthorizationError(wrongEmailOrPasswordMessage);
        }
        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
