// @ts-check
const { test, expect } = require('@playwright/test');
import * as utils from './utils.ts'



const newagent = `9${(Math.floor((Math.random() * 10000000000)))}`;

test('LKA auth', async ({page, request}) => {
   await page.goto(process.env.BaseURL + '/account/login');
   await expect(page).toHaveTitle(/Личный Кабинет агента/);
   const authResult = await utils.rocketAuth(request);
   await page.locator('.phone-control__input').fill(process.env.DirPhone);
   await page.getByText('Войти').click();
   await page.waitForTimeout(3000);                                   // тут задается ожидание,т.к. смс не успевает приходить
   const codeSMS = await utils.getCodeFromRocket(process.env.DirPhone as string, request, authResult);
   await expect(page.getByText(`На номер ${utils.phoneFormatted(process.env.DirPhone as string)} отправлено SMS с кодом`)).toBeVisible();
   await page.locator('.text-control__input-entry').fill(codeSMS);
   await page.getByRole('button', { name: 'Подтвердить' }).click();
   await expect(page).toHaveURL(process.env.BaseURL + '/cabinet/agents');        //проверяем что был совершен переход по урлу на новую страницу
   await expect(page.locator('.header__user-info-avatar')).toBeVisible();
});

// добавление нового агента 
test('New agent', async ({ page, request}) => {
   await page.goto(process.env.BaseURL + '/account/login');
   await expect(page).toHaveTitle(/Личный Кабинет агента/);
   const authResult = await utils.rocketAuth(request);
   await page.locator('.phone-control__input').fill(process.env.DirPhone);
   await page.getByText('Войти').click();
   await page.waitForTimeout(3000);                                   // тут задается ожидание,т.к. смс не успевает приходить
   const codeSMS = await utils.getCodeFromRocket(process.env.DirPhone as string, request, authResult);
   await expect(page.getByText(`На номер ${utils.phoneFormatted(process.env.DirPhone as string)} отправлено SMS с кодом`)).toBeVisible();
   await page.locator('.text-control__input-entry').fill(codeSMS);
   await page.getByRole('button', { name: 'Подтвердить' }).click();
   await page.waitForTimeout(3000);
   await expect(page).toHaveURL(process.env.BaseURL + '/cabinet/agents');        
   await expect(page.locator('.header__user-info-avatar')).toBeVisible();
   //добавляем агента
   await page.getByRole('heading', { name: 'Агенты' }).click();
   await page.getByRole('button', { name: 'Добавить агента' }).click();
   await page.getByRole('heading', { name: 'Добавление агента' }).click();
   await page.getByPlaceholder('Иванов', { exact: true }).fill('Авто');
   await page.getByPlaceholder('Иван', { exact: true }).fill('Петр');
   await page.getByPlaceholder('Иванович', { exact: true }).fill('Петрович');
   //const newagent = `9${(Math.floor((Math.random() * 10000000000)))}`;
   await page.getByPlaceholder('(999) 999-99-99').fill(newagent);
   await page.getByPlaceholder('Введите эл. почту').fill('treznikova@profitbase.ru');
   await page.getByText('Выдать права управляющего агента').click();
   await page.getByText('Получено согласие на обработку персональных данных от агента').click();
   await page.getByRole('button', { name: 'Добавить' }).click();
   await page.waitForTimeout(1000); 
   //await expect(page.locator('div').filter({ hasText: `Приглашение отправлено На номер ${utils.phoneFormatted(newagent as string)}` })).first().toBeVisible();
   await expect(page.locator('.agent-details__agent-name')).toBeVisible();
   
 });

 //авторизация нового агента 

 test('NewAgent auth', async ({page, request}) => {
   await page.goto(process.env.BaseURL + '/account/login');
   await expect(page).toHaveTitle(/Личный Кабинет агента/);
   const authResult = await utils.rocketAuth(request);
   await page.locator('.phone-control__input').fill(newagent);
   await page.getByText('Войти').click();
   await page.waitForTimeout(3000);                                   // тут задается ожидание,т.к. смс не успевает приходить
   const codeSMS = await utils.getCodeFromRocket(newagent as string, request, authResult);
   await expect(page.getByText(`На номер ${utils.phoneFormatted(newagent as string)} отправлено SMS с кодом`)).toBeVisible();
   await page.locator('.text-control__input-entry').fill(codeSMS);
   await page.getByRole('button', { name: 'Подтвердить' }).click();
   await page.waitForTimeout(3000);
// тут идет согласие с инстуркциями и политиками
   await expect(page.locator('.instructions')).toBeVisible();
   await expect(page.getByText('Ознакомьтесь с инструкциями по работе в личном кабинете агента.'));
   await page.getByText('Я ознакомился со всеми инструкциями').click();
   await page.getByText('Я даю согласие на обработку персональных данных').click();
   await page.getByRole('button', { name: 'Присоединиться' }).click();
   await expect(page).toHaveURL(process.env.BaseURL + '/cabinet/agents');       
   await expect(page.locator('.header__user-info-avatar')).toBeVisible();

});
