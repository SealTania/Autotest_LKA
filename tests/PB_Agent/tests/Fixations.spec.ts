const { test } = require('@playwright/test');
import * as utils from '../../utils.ts';
import LoginPage from '../Page_Objects/UnAuth_zone/login_page.ts';
import AgentPage from '../Page_Objects/Auth_zone/agents_page.ts';
import ClientPage from '../Page_Objects/Auth_zone/clients_page.ts';

test.beforeEach('Auth Dir main metod', async ({page, request}) => { // Самый сложный вариант оптимизации - global setup https://playwright.dev/docs/test-global-setup-teardown ; отличный и относительно не сложный вариант - кастомная фикстура https://playwright.dev/docs/test-fixtures
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillPhone(process.env.DirPhone as string);
    await loginPage.clickLoginButton();
    await loginPage.checkAuthCode(process.env.DirPhone as string, page, request);

 });

test('New fixation simple', async ({page, request}) => { // все, что не используешь (request) - удаляй лучше
    const agentsPage = new AgentPage(page);
    const clientsPage = new ClientPage(page); // приебка, но почему переменная во множественном числе (clients), а класс в единичном (client)? Как-то лучше унифицировать
    await agentsPage.gotoClients(page); // что тут какая-то путанница, зачем нам создавать экземпляр класса AgentsPage и переходить на ClinetsPage? ты же можешь сразу создать ClinetsPage и потом вызвать метод goto или open
    await clientsPage.gotoNewFix(page); 
    await clientsPage.fillName('Test', 'Таня', 'Профит');
    await clientsPage.fillPhone(`9${(Math.floor((Math.random() * 10000000000)))}`);
    await clientsPage.fillEmail(process.env.Email as string);
    await clientsPage.fillObjectInterest(page);
    await clientsPage.fillComment("Тест автотеста");
    await clientsPage.agreePersonalData();
    await clientsPage.clickSendButton(page);

});

test('New fixation 2phone', async ({page, request}) => { // тут прям вообще едентичные тесты, лучше параметризировать. Можно метод fillPhone сделать таким, чтобы он принимал массив номеров и уже заполнял основной и дополнительные
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