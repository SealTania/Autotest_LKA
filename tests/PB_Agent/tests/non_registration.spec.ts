const { test } = require('@playwright/test');
import * as utils from '../../utils.ts';
import LoginPage from '../Page_Objects/UnAuth_zone/login_page.ts';
import RegistrationPage from '../Page_Objects/UnAuth_zone/registr_page.ts';
import RegistrationNonPage from '../Page_Objects/UnAuth_zone/registr_non_page.ts';

test('Nonresident registration with comment-instr', async ({page, request}) => {
    const loginPage = new LoginPage(page);
    const registrPage = new RegistrationPage(page);
    const nonRegPage = new RegistrationNonPage(page); // если нужно переходить по страницам, то либо в методе перехода возвращай новую страницу, либо создавай их по мере перехода в коде, а не все сразу
    await loginPage.goto();
    await loginPage.registrationForm(page);
    await nonRegPage.goto(); // а сразу перейти к этой странице нельзя? 
    await registrPage.newMarketingName(page);
    await nonRegPage.fillDirName('Test', 'Таня', 'Профит'); // думаю, что стоит провайдить сразу ФИО, а в методе уже парсить
    await nonRegPage.fillPhone(process.env.newPhone as string);
    await nonRegPage.fillEmail(process.env.Email as string);
    await page.waitForTimeout(5000); // зачем таймаут, без него никак? 
    await registrPage.clickSendButton(page);
    await registrPage.checkRegCode(process.env.newPhone as string, page, request);
    await nonRegPage.commentPage();
    await nonRegPage.instructionPage(page);


});



