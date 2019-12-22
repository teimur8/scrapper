
const puppeteer = require('puppeteer');

let _browser;

const options = {
    headless: false,
};

async function launch(params) {
    _browser = await puppeteer.launch({ ...options, ...params });
    return _browser;
}

async function newPage(params) {
    _browser = await _browser ? _browser : await puppeteer.launch({ ...options, ...params })
    return await _browser.newPage();
}

async function saveCookies() {
    return await puppeteer.launch({ ...options, ...params });
}

async function close() {
    await _browser.close();
}


module.exports.launch = launch;
module.exports.newPage = newPage;
module.exports.close = close;




