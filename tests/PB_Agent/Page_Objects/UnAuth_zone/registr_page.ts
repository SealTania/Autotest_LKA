import { Locator, Page, expect } from "@playwright/test";
import * as utils from '../../../utils'


class RegistrationPage {
// свойства класса
    public readonly page: Page;
    public readonly pageUrl: string;
    public readonly registrForm: Locator;       
    public readonly banner: Locator;           
    public readonly backButton: Locator;      
    public readonly marketingInput: Locator;  
    public readonly marketingButton: Locator;
    public readonly newNameMarketButton: Locator;
    public readonly sendButton: Locator;
    public readonly regModal:Locator;
    public readonly codeInput: Locator;
    public readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageUrl = process.env.BaseURL as string;
        this.registrForm = page.locator('div[class="sub-layout-account__form"]');
        this.banner = page.locator('div[class*=alert__container]');
        this.backButton = page.locator('a[class="sub-layout-account__back-link back-link"]');
        this.marketingInput = page.locator('input[class*=select-simple-autocomplete]');
        this.marketingButton = page.locator('button[class*=select-simple-autocomplete]');
        this.newNameMarketButton = page.locator('div[class="drop-down-list__item-title drop-down-list__item-new"]');
        this.sendButton = page.locator('button[class="ui-btn ui-btn_type_primary ui-btn_size_m"]'); 
        this.regModal = page.locator('div[class="modal-layout__container-inner"]'); 
        this.codeInput = page.locator('div.modal-layout__container-inner input'); // стоит как-то унифицировать вид селекторов для локаторов
        this.submitButton = page.locator('div.modal-layout__container-inner button[class*=ui-btn_type_primary]');
       
    }
    public async goback(page): Promise<void> { // goBack
        console.log('Go back');
        await this.backButton.click();
        await expect(page).toHaveURL(`${this.pageUrl}/account/login`);
    }
    public async newMarketingName(page): Promise<void> { // глагол
        console.log('Filling new marketing name');
        await this.marketingInput.click(); // зачем сначала click, можно же сразу fill
        await this.marketingInput.fill('Test агентство 5'); // вынести хардкод в тестовый файл
        await page.waitForTimeout(2000);  // точно нужен таймаут
        await this.newNameMarketButton.click();
    }

    public async clickSendButton(page): Promise<void> { // думаю лучше просто send или sendForm...
        console.log('Go to modal');
        await this.sendButton.click();
    
    }


    public async fillCode(phoneNomber: string, request): Promise<void> {
        console.log('Filling code sms');
        const authResult = await utils.rocketAuth(request);
        const codeSMS = await utils.getCodeFromRocketReg(phoneNomber, request, authResult); // переиспользовать одинаковый код надо
        await this.codeInput.fill(codeSMS);
        await this.submitButton.click();
    }

    public async checkRegCode(phoneNomber: string, page, request): Promise<void> {
        await page.waitForTimeout(5000); 
        await expect(this.regModal).toBeVisible();
        await this.fillCode(phoneNomber, request);
        await page.waitForTimeout(8000);   
        await expect(page).toHaveURL(`${this.pageUrl}/agreement`);
        console.log('Successful');

    }   




}
    
export default RegistrationPage;