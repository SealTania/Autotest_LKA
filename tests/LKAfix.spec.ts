// @ts-check
const { test, expect } = require('@playwright/test');
import * as utils from './utils.ts'


test.beforeEach('LKA auth', async ({page, request}) => {
   await page.goto(process.env.BaseURL + '/account/login');
   await expect(page).toHaveTitle(/Личный Кабинет агента/);
   const authResult = await utils.rocketAuth(request);
   await page.locator('.phone-control__input').fill(process.env.AgentPhone);
   await page.getByText('Войти').click();
   await page.waitForTimeout(3000);                                   // тут задается ожидание,т.к. смс не успевает приходить
   const codeSMS = await utils.getCodeFromRocket(process.env.AgentPhone as string, request, authResult);
   await expect(page.getByText(`На номер ${utils.phoneFormatted(process.env.AgentPhone as string)} отправлено SMS с кодом`)).toBeVisible();
   await page.locator('.text-control__input-entry').fill(codeSMS);
   await page.getByRole('button', { name: 'Подтвердить' }).click();
   await expect(page).toHaveURL(process.env.BaseURL + '/cabinet/agents');        //проверяем что был совершен переход по урлу на новую страницу
   await expect(page.locator('.header__user-info-avatar')).toBeVisible();
});

// фиксация уникального клиента

test('Fixation 1 client', async ({page}) => {  
  await page.getByRole('link', { name: 'Клиенты' }).click();
  await expect(page).toHaveURL(process.env.BaseURL + '/cabinet/clients'); 
  await page.getByRole('button', { name: 'Фиксация клиента' }).click();
  await page.locator('.text-control-paint').first().click();
  await page.getByPlaceholder('Иванов', { exact: true }).fill('Авто');
  await page.getByPlaceholder('Иван', { exact: true }).fill('Рома');
  await page.getByPlaceholder('Иванович').fill('Олегович');
  await page.getByPlaceholder('(999) 999-99-99').fill(`9${(Math.floor((Math.random() * 10000000000)))}`);
  await page.getByPlaceholder('Введите эл. почту').fill(process.env.Email);
  await page.getByPlaceholder('Введите или выберите значение').click();
  await page.getByPlaceholder('Введите или выберите значение').fill(process.env.projectName);
  await page.getByPlaceholder('Введите или выберите значение').click();
  await page.keyboard.press('Enter');
  await page.locator('.drop-down-list__item.is-only-title').getByText(process.env.projectName).click();
  await page.getByPlaceholder('Напишите доп. информацию по клиенту, которую  вы хотите сообщить менеджеру Застр').fill('тут комент- Автотест');
  await page.getByText('Подтверждаю, что Клиент ознакомлен с условиями обработки персональных данных').click();
  await page.getByRole('button', { name: 'Зафиксировать' }).click();
  await page.locator('.client__info__item_value').getByText('Проверка');
  await expect(page.locator('.alert__container')).toBeVisible();
});

// фиксация с двумя клиентами (оба уникальны)
test('Fixation 2 clients', async ({ page }) => {
  await page.getByRole('link', { name: 'Клиенты' }).click();
  await expect(page).toHaveURL(process.env.BaseURL + '/cabinet/clients'); 
  await page.getByRole('button', { name: 'Фиксация клиента' }).click();
  await page.getByPlaceholder('Иванов', { exact: true }).fill('Авто');
  await page.getByPlaceholder('Иван', { exact: true }).fill('Петр');
  await page.getByPlaceholder('Иванович').fill('Авто');
  await page.getByPlaceholder('(999) 999-99-99').fill(`9${(Math.floor((Math.random() * 10000000000)))}`);
  await page.getByPlaceholder('Введите эл. почту').fill(process.env.Email);
  await page.getByRole('button', { name: 'Добавить доп. телефон' }).click();
  await page.locator('ab-form-control-container').filter({ hasText: 'Дополнительный телефон *+' }).getByPlaceholder('(999) 999-99-').fill(`9${(Math.floor((Math.random() * 1000000000)))}`);
  await page.locator('lka-additional-participants div').filter({ hasText: 'Добавить доп. участника' }).click();
  await page.getByPlaceholder('Иванов', { exact: true }).nth(1).fill('Авто');
  await page.getByPlaceholder('Иван', { exact: true }).nth(1).fill('Василий');
  await page.getByPlaceholder('Иванович').nth(1).fill('Дополнительный');
  await page.getByPlaceholder('(999) 999-99-99').nth(2).fill(`9${(Math.floor((Math.random() * 10000000000)))}`);
  await page.getByPlaceholder('Введите или выберите значение').click();
  await page.getByPlaceholder('Введите или выберите значение').fill(process.env.projectName);
  await page.getByPlaceholder('Введите или выберите значение').click();
  await page.keyboard.press('Enter');
  await page.locator('.drop-down-list__item.is-only-title').getByText(process.env.projectName).click();
  await page.getByPlaceholder('Напишите доп. информацию по клиенту, которую  вы хотите сообщить менеджеру Застр').fill('Это комент от автотеста');
  await page.getByText('Подтверждаю, что Клиент ознакомлен с условиями обработки персональных данных и п').click();
  await page.getByRole('button', { name: 'Зафиксировать' }).click();
  await page.locator('.client__info__item_value').getByText('Проверка');
  await expect(page.locator('.alert__container')).toBeVisible();
  
});

// тест продления уже существующей фиксации

test('ProlongFix', async ({ page }) => {
  await page.getByRole('link', { name: 'Клиенты' }).click();
  await expect(page.locator('.table__container')).toBeVisible();
  await expect(page).toHaveURL(process.env.BaseURL + '/cabinet/clients'); 
  await page.locator('ab-select-multi-value-accessor').getByRole('button').click();
  await page.locator('.drop-down-list__item-title').getByText('Заканчивается срок').click();
  await page.locator('.form__label-container').getByText('Статус').click();
  await page.locator('div:nth-child(2) > .table__tr > div').first().click();
  await expect(page.locator('.client__info__item_value')).toBeVisible();
  await expect(page.getByText('Зафиксирован до')).toBeVisible();
  await page.getByText('Продлить фиксацию').click();
  await expect(page.getByText('Зафиксирован до')).toBeVisible();

});


// восстановеление протухшей фиксации, если есть
test('restorFix', async ({ page }) => {
  await page.getByRole('link', { name: 'Клиенты' }).click();
  await expect(page.locator('.table__container')).toBeVisible();
  await expect(page).toHaveURL(process.env.BaseURL + '/cabinet/clients'); 
  await page.locator('ab-select-multi-value-accessor').getByRole('button').click();
  await page.locator('.drop-down-list__item-title').getByText('Фиксация просрочена').click();
  await page.locator('.form__label-container').getByText('Статус').click();
  await page.waitForTimeout(2000);   
  // надо будет сделать проверку - вдруг протухших нет вовсе и будет заглушка
  await page.locator('div:nth-child(2) > .table__tr > div').first().click();
  await expect(page.getByText('Фиксация просрочена')).toBeVisible();
  await page.getByText('Восстановить фиксацию', { exact: true }).click();
  await expect(page.getByText('Зафиксирован до')).toBeVisible();
});




