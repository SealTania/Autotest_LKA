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
        this.sendButton = page.locator('button[type="button"]');
        this.regModal = page.locator('div[class="modal-layout__container-inner"]');
        this.codeInput = page.locator('input[class*=text-control__input-entry]');
        this.submitButton = page.locator('button[class*=ui-btn_type_primary]');
       
    }
    public async goback(page): Promise<void> {
        console.log('Go back');
        await this.backButton.click();
        await expect(page).toHaveURL(`${this.pageUrl}/account/login`);
    }
    public async newMarketingName(page): Promise<void> {
        console.log('Filling new marketing name');
        await this.marketingInput.click();
        await this.newNameMarketButton.click();
    }

    public async clickSendButton(page): Promise<void> {
        console.log('Go to modal');
        await this.sendButton.click();
    }

    




}
    
export default RegistrationPage;