/**
 * Регистрация в ycharts
 */

const puppeteer = require('./../core/puppeteer');
const faker = require('faker');
const db = require('./../core/database');
const yandex = require('./yandex-mail');
const cli = require('./../core/cli');
const request = require('request-promise');


const config = async (page) => {

    // как у Солодина
    const multichart = `{"multi_chart_column1":"[[\"price\",\"5\"],[\"percent_of_float\",\"5\"],[\"fair_value\",\"5\"],[\"market_cap\",\"5\"],[\"revenues_ttm\",\"\"],[\"revenues_growth_annual\",\"10\"],[\"net_income_ttm\",\"5\"],[\"shareholders_equity\",\"10\"],[\"total_current_liabilities\",\"5\"],[\"total_long_term_liab\",\"5\"],[\"current_ratio\",\"5\"],[\"quick_ratio\",\"5\"],[\"cash_operations_ttm\",\"5\"],[\"cash_financing_ttm\",\"\"],[\"cash_investing_ttm\",\"5\"],[\"cash_operations_growth_annual\",\"5\"],[\"free_cash_flow_ttm\",\"5\"],[\"free_cash_flow\",\"5\"],[\"net_common_equity_issued_ttm\",\"5\"],[\"net_buyback_yield_ttm\",\"5\"],[\"shares_outstanding\",\"5\"],[\"payout_ratio\",\"5\"],[\"dividend_per_share_ttm\",\"5\"],[\"dividend_yield\",\"5\"],[\"dividend_growth_ttm\",\"5\"],[\"shares_owned_by_institutional_investors\",\"\"],[\"shares_owned_by_insiders\",\"5\"]]","multi_chart_column2":"[[\"net_eps_basic_ttm\",\"5\"],[\"eps\",\"5\"],[\"normalized_eps_ttm\",\"5\"],[\"eps_growth_annual\",\"5\"],[\"pe_ratio\",\"\"],[\"forward_pe_ratio\",\"5\"],[\"price_to_book_value\",\"5\"],[\"rsi_14\",\"5\"],[\"average_volume_30\",\"5\"],[\"annualized_daily_one_year_return\",\"5\"],[\"return_on_invested_capital_3y_mdn\",\"5\"],[\"expenses_ttm\",\"5\"],[\"capex_ttm\",\"5\"],[\"r_and_d_expense_ttm\",\"5\"],[\"rnd_to_revenue_ttm\",\"5\"],[\"cash_flow_to_capex\",\"5\"],[\"total_operating_expense_ttm\",\"5\"],[\"debt_issuance_net_total_ttm\",\"5\"],[\"net_debt_paydown_yield_ttm\",\"5\"],[\"profit_margin_3y_mdn\",\"5\"],[\"earnings_surprise\",\"5\"],[\"return_on_equity_3y_mdn\",\"5\"],[\"assets\",\"5\"],[\"receivables_cs_ast\",\"5\"],[\"liabilities\",\"5\"],[\"payables_cs_ast\",\"5\"]]"}`;


}

const register = async (page, USER_DATA) => {

    const LOGIN_INPUT_FIRSTNAME = '#id_first_name';
    const LOGIN_INPUT_LASTNAME = '#id_last_name';
    const LOGIN_INPUT_EMAIL = '#id_email';
    const LOGIN_INPUT_PASSWORD = '#id_password1';
    const LOGIN_INPUT_PASSWORD_CONFIRM = '#id_password2';
    const LOGIN_CH_TERMS = '#id_terms_checkbox';
    const LOGIN_SEL_JOB = '#id_job_function';
    const LOGIN_INPUT_PHONE = '#id_phone_number';

    const uri = `https://ycharts.com/store/start_trial_register`;

    await page.goto(uri);

    await page.type(LOGIN_INPUT_FIRSTNAME, USER_DATA.firstname);
    await page.type(LOGIN_INPUT_LASTNAME, USER_DATA.lastname);
    await page.type(LOGIN_INPUT_EMAIL, `${USER_DATA.login}@${USER_DATA.type}`);
    await page.type(LOGIN_INPUT_PASSWORD, USER_DATA.password);
    await page.type(LOGIN_INPUT_PASSWORD_CONFIRM, USER_DATA.password);
    await page.type(LOGIN_INPUT_PHONE, USER_DATA.phone);
    await page.select(LOGIN_SEL_JOB, 'personal_investor')
    await page.click(LOGIN_CH_TERMS);


    let res = false;
    await cli.askQuestion('Зарегался?')
        .then(() => res = true)
        .catch(() => res = false);

    return res;

}

(async () => {


    const obj = {
        multi_chart_column1: [["price", "5"], ["revenues_ttm", ""]],
        multi_chart_column2: [],
    };

    const response = await request({
        url: 'https://ycharts.com/accounts/preferences',
        method: 'PUT',
        json: obj,
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-US,en;q=0.9,ru;q=0.8",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Length": "96",
            "Content-Type": "application/json;charset=UTF-8",
            "Cookie": "d-a8e6=06568519-5c2c-431a-bcb9-d434524b4cb5; hblid=CpWoJdT0eJRp8YjW1y8Lx0Ja2bc9oBPB; olfsk=olfsk17373718628222035; page_view_ctr=25; _okdetect=%7B%22token%22%3A%2215769161746710%22%2C%22proto%22%3A%22https%3A%22%2C%22host%22%3A%22ycharts.com%22%7D; _ok=1228-592-10-8601; ycsessionid=nhf9fjxzif3smaz6tc0y70hv8zgegken; csrftoken=ddd4dvgswyrKBgHGYowJ5madskuEdngxPo7xLRbQF5zRhCQelHbHKQ1j1hQVigLL; wcsid=ap08H65gzBFq5Y2V1y8Lx0JBB2d45Ir6; _okbk=cd4%3Dtrue%2Cvi5%3D0%2Cvi4%3D1576921652008%2Cvi3%3Dactive%2Cvi2%3Dfalse%2Cvi1%3Dfalse%2Ccd8%3Dchat%2Ccd6%3D0%2Ccd5%3Daway%2Ccd3%3Dfalse%2Ccd2%3D0%2Ccd1%3D0%2C; s-9da4=9e771094-6309-45d2-bf04-4d3b9a0e5017; _oklv=1576924322169%2Cap08H65gzBFq5Y2V1y8Lx0JBB2d45Ir6",
            "DNT": "1",
            "Host": "ycharts.com",
            "Origin": "https://ycharts.com",
            "Pragma": "no-cache",
            "Referer": "https://ycharts.com/companies/FIZZ/multichart",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
            "X-CSRFToken": "ddd4dvgswyrKBgHGYowJ5madskuEdngxPo7xLRbQF5zRhCQelHbHKQ1j1hQVigLL",
            "X-Requested-With": "XMLHttpRequest",
        },
    });


    console.log(response);
    return;



    const page = await puppeteer.newPage();

    const USER_DATA = yandex.getUserData();
    // const USER_DATA = db.get('emails').value().pop();

    console.log(USER_DATA)

    if (!await yandex.register(page, USER_DATA)) {
        await puppeteer.close();
        return;
    }

    yandex.saveUserData(USER_DATA);

    if (!await register(page, USER_DATA)) {
        await puppeteer.close();
        return;
    }

    await yandex.login(page, USER_DATA);








})();
