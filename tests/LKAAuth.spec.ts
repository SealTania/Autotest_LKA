// @ts-check
const { test, expect } = require('@playwright/test');
import * as utils from './utils.ts'

test.beforeEach('LKA url', async ({page, request}) => {
    await page.goto(process.env.BaseURL + '/account/login');
    await expect(page).toHaveTitle(/Личный Кабинет агента/);
});

test('FAIL authorization', async ({page}) => {
    await page.locator('.phone-control__input').fill(process.env.Failphone);
    await page.getByText('Войти').click();
    await expect(page.getByText('Номер не найден. Проверьте правильность ввода номера')).toBeVisible();
});

//авторизация директора АН

test('Auth main metod', async ({page, request}) => {
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





