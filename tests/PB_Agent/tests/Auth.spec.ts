const { test } = require('@playwright/test');
import * as utils from '../../utils.ts'
import LoginPage from '../Page_Objects/UnAuth_zone/Login_page.ts';

test('FAIL authorization', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillPhone(process.env.Failphone as string); // лучше подобные данные конфигурировать куда-то в конфигу и от туда тянуть
    await loginPage.clickLoginButton();
    await loginPage.allertFail();
});

test('Auth Dir main metod', async ({page, request}) => { // без контекста не понятно что такое Dir main + лучше сначала прогонять позитивные, а потом уже негативные
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillPhone(process.env.DirPhone as string);
    await loginPage.clickLoginButton();
    await loginPage.checkAuthCode(process.env.DirPhone as string, page, request);

 });

/*test('Auth additional metod', async ({page, request}) => {



 });
 */

 // не оставляй такие комменты