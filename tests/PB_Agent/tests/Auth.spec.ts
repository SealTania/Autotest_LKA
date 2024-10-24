const { test } = require('@playwright/test'); // import юзай, раз уж на ts 
import * as utils from '../../utils.ts' // лишние испорты лучше сразу уберать, если понадобятся - добавишь
import LoginPage from '../Page_Objects/UnAuth_zone/login_page.ts';

// все три теста можно представить как один параметризованный, т.к. почти все повторяется https://playwright.dev/docs/test-parameterize - но это не обязательно. 

test('FAIL authorization', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillPhone(process.env.Failphone as string); // можно так process.env.Failphone! чтобы as string не писать, оператор ! убирает значение undefined
    await loginPage.clickLoginButton();
    await loginPage.allertFail();
});

test('Auth Dir main metod', async ({page, request}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillPhone(process.env.DirPhone as string);
    await loginPage.clickLoginButton();
    await loginPage.checkAuthCode(process.env.DirPhone as string, page, request);

 });

/**test('Auth additional metod', async ({page, request}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillPhone(process.env.DirPhone as string);
    await loginPage.clickLoginButton();
    await loginPage.addMetodSMS(process.env.DirPhone as string, page, request);

 });
 **/