import bcrypt from 'bcryptjs';

const withoutUsernameLogin = {
  username: '',
  password: 'onlyPassword',
};

const withoutPasswordLogin = {
    username: 'Hagar',
    password: '',
};

const validLogin = {
    username: 'Eddie',
    password: 'secret',
}

const invalidLogin = {
    username: 'Eddie',
    password: 'NotSecret',
}

const validToUser = {
    username: 'Eddie',
    vocation: 'admin',
    level: 5,
    password: bcrypt.hashSync('secret'),
};



const token = { token: 'cn65d6bac951343' };

export {
    withoutUsernameLogin,
    withoutPasswordLogin,
    validLogin,
    invalidLogin,
    validToUser,
    token,
};