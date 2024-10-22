const { test } = require('@playwright/test');
import * as utils from '../../utils.ts';
import LoginPage from '../Page_Objects/UnAuth_zone/login_page.ts';
import AgentPage from '../Page_Objects/Auth_zone/agents_page.ts';
import ClientPage from '../Page_Objects/Auth_zone/clients_page.ts';

test.beforeEach('Auth Dir main metod', async ({page, request}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillPhone(process.env.DirPhone as string);
    await loginPage.clickLoginButton();
    await loginPage.checkAuthCode(process.env.DirPhone as string, page, request);

 });

test('New fixation simple', async ({page, request}) => {
    const agentsPage = new AgentPage(page);
    const clientsPage = new ClientPage(page);
    await agentsPage.gotoClients(page);
    await clientsPage.gotoNewFix(page);
    await clientsPage.fillName('Test', 'Таня', 'Профит');
    await clientsPage.fillPhone(`9${(Math.floor((Math.random() * 10000000000)))}`);
    await clientsPage.fillEmail(process.env.Email as string);
    await clientsPage.fillObjectInterest(page);
    await clientsPage.fillComment("Тест автотеста");
    await clientsPage.agreePersonalData();
    await clientsPage.clickSendButton(page);

});

test('New fixation 2phone', async ({page, request}) => {
    const agentsPage = new AgentPage(page);
    const clientsPage = new ClientPage(page);
    await agentsPage.gotoClients(page);
    await clientsPage.gotoNewFix(page);
    await clientsPage.fillName('Test', 'Оля', 'Профит');
    await clientsPage.fillPhone(`9${(Math.floor((Math.random() * 10000000000)))}`);
    await clientsPage.fillEmail(process.env.Email as string);
    await clientsPage.fillAddPhone(`9${(Math.floor((Math.random() * 10000000000)))}`);
    await clientsPage.fillObjectInterest(page);
    await clientsPage.fillComment("Тест автотеста");
    await clientsPage.agreePersonalData();
    await clientsPage.clickSendButton(page);



});