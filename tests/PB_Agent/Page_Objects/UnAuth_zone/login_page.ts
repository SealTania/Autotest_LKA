import { Locator, Page, expect } from "@playwright/test";
//import BasePage from '../base_page';
import * as utils from '../../../utils'


class LoginPage {

    // свойства класса
    public readonly page: Page;
    public readonly pageUrl: string;
    public readonly phone: Locator; 
    public readonly loginButton: Locator; 
	public readonly codeCountryButton: Locator;  
    public readonly countryCode: Locator;
    public readonly partnerButton: Locator;  
    public readonly logo: Locator;
    public readonly banner: Locator;
    public readonly errorAlert: Locator;
    public readonly authModal: Locator;
    public readonly codeInput: Locator;
    public readonly addMetod: Locator;
    public readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageUrl = process.env.BaseURL as string; // тут урл страницы авторизации
        this.logo = page.locator('div[class ="header__logo"]');
        this.banner = page.locator('div[class ="banner__text-block"]');
        this.phone = page.locator('input[type="tel"]');   // или попробовать этот '.phone-control__input'
        this.loginButton = page.locator('div[class=login-form__btn-submit] button'); 
        this.partnerButton = page.locator('button[class ="register-tile register-tile_start-business"]'); 
        this.errorAlert = page.locator('div[class="isError message ng-star-inserted"]'); 
        this.codeCountryButton = page.locator('div[class*="phone-control__country ng-star-inserte"]')
        this.countryCode = page.locator('div[class*=phone-control__dropdown-item]')
        this.authModal = page.locator('div[class="modal-layout__container-inner"]');
        this.addMetod = page.locator('a[class="confirm-operation-layer__additional-otp link_undashed ng-star-inserted"]');
        this.codeInput = page.locator('input[class*=text-control__input-entry]'); 
        this.submitButton = page.locator('button[class ="ui-btn ui-btn-primary ui-btn-primary_m"]');
    }

    // методы класса

    public async goto(): Promise<void> {
        console.log('Go to login page');
        await this.page.goto(`${this.pageUrl}/account/login`);
    }

    public async fillPhone(phoneNomber: string): Promise<void> {
        console.log('Filling phone');
        await this.phone.fill(phoneNomber);
    }

    public async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }
    public async allertFail(): Promise<void> {
        console.log('Alert is fail');
        await expect(this.errorAlert).toBeVisible();
    }

    public async fillCode(phoneNomber: string, request): Promise<void> {
        console.log('Filling code sms');
        const authResult = await utils.rocketAuth(request);
        const codeSMS = await utils.getCodeFromRocket(phoneNomber, request, authResult);
        await this.codeInput.fill(codeSMS);
        await this.submitButton.click();
    }

    public async checkAuthCode(phoneNomber: string, page, request): Promise<void> {
        await expect(this.authModal).toBeVisible();
        await this.fillCode(phoneNomber, request);
        await expect(page).toHaveURL(`${this.pageUrl}/cabinet/agents`);
        console.log('Auth is successful');

    }

    public async chooseCodeCountry(): Promise<void> {   
        console.log('Choose code country');
        await this.codeCountryButton.click();
        await this.countryCode.nth(2).click();
    } 

    public async addMetodSMS(phoneNomber: string, page, request): Promise<void> {   
        console.log('Choose additional metod');
        await expect(this.authModal).toBeVisible();
        await this.addMetod.click();
        await this.checkAuthCode(phoneNomber, page, request);
    } 

    public async registrationForm(page): Promise<void> {   
        console.log('Go to Registr page ');
        await this.partnerButton.click();
        await expect(page).toHaveURL(`${this.pageUrl}/account/register`);
        
    }


}
 
export default LoginPage;