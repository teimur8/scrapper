const faker = require('faker');
const db = require('./../core/database');
const cli = require('./../core/cli');

function getUserData() {
    const USER_DATA = {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        login: `${faker.internet.userName()}${faker.internet.userName()}`.replace(/[\W+|_]/g, '').slice(0, 15),
        password: faker.internet.password(),
        answer: faker.company.companyName(),
        createdAt: new Date,
        type: "yandex.kz",
        phone: faker.phone.phoneNumber('+7 ### #######'),
    };

    return USER_DATA;
}

async function saveUserData(userData) {
    await db.get('emails').push(userData).write();
}

async function login(page, userData) {

    const mailUrl = `https://passport.yandex.kz/auth`;

    const LOGIN_INPUT_LOGIN = '#passp-field-login';
    const LOGIN_INPUT_PASSWORD = '#passp-field-passwd';
    const LOGIN_BTN = '.button2_type_submit';

    await page.goto(mailUrl);

    await page.type(LOGIN_INPUT_LOGIN, userData.login);
    await page.click(LOGIN_BTN);
    await page.waitFor(1000)
    await page.type(LOGIN_INPUT_PASSWORD, userData.password);
    await page.click(LOGIN_BTN);

}

async function register(page, userData) {

    const LOGIN_INPUT_FIRSTNAME = '#firstname';
    const LOGIN_INPUT_LASTNAME = '#lastname';
    const LOGIN_INPUT_LOGIN = '#login';
    const LOGIN_INPUT_PASSWORD = '#password';
    const LOGIN_INPUT_PASSWORD_CONFIRM = '#password_confirm';
    const LOGIN_BTN_NO_HONE = '.link_has-no-phone';
    const LOGIN_INPUT_ANSWER = '#hint_answer';

    const mailUrl = `https://passport.yandex.kz/registration/mail`;

    await page.goto(mailUrl);

    await page.type(LOGIN_INPUT_FIRSTNAME, userData.firstname);
    await page.type(LOGIN_INPUT_LASTNAME, userData.lastname);
    await page.type(LOGIN_INPUT_LOGIN, userData.login);
    await page.type(LOGIN_INPUT_PASSWORD, userData.password);
    await page.type(LOGIN_INPUT_PASSWORD_CONFIRM, userData.password);
    await page.click(LOGIN_BTN_NO_HONE);
    await page.type(LOGIN_INPUT_ANSWER, userData.answer);

    let res = false;
    await cli.askQuestion('Зарегался?')
    .then(() => res = true)
    .catch(() => res = false);

    return res;
}

module.exports.getUserData = getUserData;
module.exports.saveUserData = saveUserData;
module.exports.login = login;
module.exports.register = register;



