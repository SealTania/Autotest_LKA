const { test } = require('@playwright/test');
import * as utils from '../../utils.ts'
import LoginPage from '../Page_Objects/UnAuth_zone/login_page.ts';

test('FAIL authorization', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillPhone(process.env.Failphone as string);
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

test('Auth additional metod', async ({page, request}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillPhone(process.env.DirPhone as string);
    await loginPage.clickLoginButton();
    await loginPage.addMetodSMS(process.env.DirPhone as string, page, request);

 });