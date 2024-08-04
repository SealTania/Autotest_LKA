import { Locator, Page, expect } from "@playwright/test";
//import BasePage from '../base_page';
import * as utils from '../../../utils'


class LoginPage {

    // свойства класса (какие элементы есть на странице)
    public readonly page: Page;
    public readonly pageUrl: string;
    public readonly phone: Locator; 
    public readonly loginButton: Locator; 
	public readonly codeCountry: Locator;  
    public readonly partnerButton: Locator;  
    public readonly logo: Locator;
    public readonly banner: Locator;
    public readonly errorAlert: Locator;
    public readonly authModal: Locator;
    public readonly codeInput: Locator;
    public readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageUrl = process.env.BaseURL as string; // тут урл страницы авторизации
        this.logo = page.locator('div[class ="header__logo"]');
        this.banner = page.locator('div[class ="banner__text-block"]');
        this.phone = page.locator('input[type="tel"]');   // или попробовать этот '.phone-control__input'
        this.loginButton = page.locator('div[class=login-form__btn-submit] button'); 
        this.partnerButton = page.locator('button[class ="register-tile register-tile_start-business"]');  // или 'button[class ="register-tile register-tile_start-business"]'
        this.errorAlert = page.locator('div[class="isError message ng-star-inserted"]'); 
        this.codeCountry = page.locator('div[class ="phone-control__country ng-star-inserted"]')
        this.authModal = page.locator('div[class="modal-layout__container-inner"]');
        this.codeInput = page.locator('input[class*=text-control__input-entry]'); // .text-control__input-entry
        this.submitButton = page.locator('button[class ="ui-btn ui-btn-primary ui-btn-primary_m"]');
    }

    // методы класса

    public async goto(): Promise<void> {
        console.log('Go to login page');
        await this.page.goto(`${this.pageUrl}/account/login`);
    }
    public async fillPhone(phoneNomber): Promise<void> {
        console.log('Filling phone');
        await this.phone.fill(phoneNomber as string);
    }
    public async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }
    public async allertFail(): Promise<void> {
        console.log('Alert is fail');
        await expect(this.errorAlert).toBeVisible();
    }
    public async checkAuthCode(phoneNomber, page, request): Promise<void> {
        const authResult = await utils.rocketAuth(request);
        await expect(this.authModal).toBeVisible();
        const codeSMS = await utils.getCodeFromRocket(phoneNomber as string, request, authResult);
        await this.codeInput.fill(codeSMS);
        await this.submitButton.click();
        await expect(page).toHaveURL(`${this.pageUrl}/cabinet/agents`);
        console.log('Auth is successful');

    }


     /*  public async codeCountry(): Promise<void> {   //для смены кода страны
        
    }
    */

}
 
export default LoginPage;