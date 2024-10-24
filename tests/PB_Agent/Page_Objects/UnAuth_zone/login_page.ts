import { Locator, Page, expect } from "@playwright/test";
//import BasePage from '../base_page'; 
import * as utils from '../../../utils'


class LoginPage {

    // свойства класса - для кого эти комменты? Их лучше оставлять только в местах со сложной логикой
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
        this.pageUrl = process.env.BaseURL as string; // тут урл страницы авторизации - baseUrl - можно вынести в конфигу playwright https://playwright.dev/docs/test-use-options#basic-options
        this.logo = page.locator('div[class ="header__logo"]');
        this.banner = page.locator('div[class ="banner__text-block"]');
        this.phone = page.locator('input[type="tel"]');   // или попробовать этот '.phone-control__input' - дальше пишешь codeInput, а здесь просто phone . Лучше придерживаться одной стилистики code и phone или codeInput и phoneInput. Ну и с кнопками тоже самое
        this.loginButton = page.locator('div[class=login-form__btn-submit] button'); 
        this.partnerButton = page.locator('button[class ="register-tile register-tile_start-business"]');  // кажется что атрибут класса сильно длинный можно брать по по подстроке button[class*="register-tile"] или button[class*="register-tile_start-business"], а можно и еще короче
        this.errorAlert = page.locator('div[class="isError message ng-star-inserted"]'); // ng-star-inserted , ng-star-inserte и др. это значения которые везде ангуляр сует, не надо на них завязываться, это ничего не дает, а локатор увеличивает
        this.codeCountryButton = page.locator('div[class*="phone-control__country ng-star-inserte"]')
        this.countryCode = page.locator('div[class*=phone-control__dropdown-item]')
        this.authModal = page.locator('div[class="modal-layout__container-inner"]');
        this.addMetod = page.locator('a[class="confirm-operation-layer__additional-otp link_undashed ng-star-inserted"]');
        this.codeInput = page.locator('input[class*=text-control__input-entry]'); 
        this.submitButton = page.locator('button[class ="ui-btn ui-btn-primary ui-btn-primary_m"]');
    }

    // методы класса

    public async goto(): Promise<void> {
        console.log('Go to login page'); // тоже страдал с логированием каждого шага, но по факту потом сильно будет засираться консоль, а в трейсе все видно и так. Как по мне они не нужны
        await this.page.goto(`${this.pageUrl}/account/login`);
    }

    public async fillPhone(phoneNomber: string): Promise<void> {
        console.log('Filling phone');
        await this.phone.fill(phoneNomber);
    }

    public async clickLoginButton(): Promise<void> { // я бы назвал лакончинее типа submit - но это уже приебка
        await this.loginButton.click();
    }
    public async allertFail(): Promise<void> {
        console.log('Alert is fail');
        await expect(this.errorAlert).toBeVisible(); // я бы рекомендовал все же все проверки выносить в сам тестовый файл, а не инкапсулировать в page object'ы.
    }

    public async fillCode(phoneNomber: string, request): Promise<void> {
        console.log('Filling code sms');
        const authResult = await utils.rocketAuth(request);
        const codeSMS = await utils.getCodeFromRocket(phoneNomber, request, authResult); // есть single responsibility principe (посмотришь потом). По смыслу fillCode предполагает, что в него прокинут код, который надо заполнить. То, что он его получает внутри себя - не логично + получается, что мы лишний раз прокидываем request - предлагаю получать код в файле теста и прокидывать его сюда  
        await this.codeInput.fill(codeSMS);
        await this.submitButton.click();
    }

    public async checkAuthCode(phoneNomber: string, page, request): Promise<void> { // по смыслу тут уже не проверка кода, а подтверждение авторизации
        await expect(this.authModal).toBeVisible();
        await this.fillCode(phoneNomber, request);
        await expect(page).toHaveURL(`${this.pageUrl}/cabinet/agents`);
        console.log('Auth is successful');

    }

    public async chooseCodeCountry(): Promise<void> { // пока выглядит, что хардкодом выбирается ru, поэтому лучше и назвать chooseRussianCountryCode
        console.log('Choose code country');
        await this.codeCountryButton.click();
        await this.countryCode.nth(2).click();
    } 

    public async addMetodSMS(phoneNomber: string, page, request): Promise<void> {   
        console.log('Choose additional metod');
        await expect(this.authModal).toBeVisible();
        await this.addMetod.click();
        await this.checkAuthCode(phoneNomber, page, request); // аналогично сразу несколько действий не соотносящихся с названием метода
    } 

    public async registrationForm(page): Promise<void> {   // методы лучше называть глаголом, тут вероятно лучше openRegistrationForm
        console.log('Go to Registr page ');
        await this.partnerButton.click();
        await expect(page).toHaveURL(`${this.pageUrl}/account/register`);
        
    }


}
 
export default LoginPage; // можно написать при объявлении класса

// почему так много лишних пустых строк?