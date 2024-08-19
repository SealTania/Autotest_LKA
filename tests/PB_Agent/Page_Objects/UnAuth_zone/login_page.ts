import { Locator, Page, expect } from "@playwright/test";
//import BasePage from '../base_page';
import * as utils from '../../../utils' // лучше все не импортировать, если утилок много будет, то лишняя нагрузка на их подгрузку 


class LoginPage {
  // что с отступами? 
    // свойства класса (какие элементы есть на странице)
    public readonly page: Page;
    public readonly pageUrl: string;
    public readonly phone: Locator; 
    public readonly loginButton: Locator; 
	public readonly codeCountry: Locator;  
    public readonly partnerButton: Locator;  
    public readonly logo: Locator; // зачем он нужен? ни в тестах, ни в пейдже не используется. Когда понадобится, тогда и заведешь, чтобы не тратить время на лишний поиск локаторов.
    public readonly banner: Locator;
    public readonly errorAlert: Locator; // точно ли эти поля должны быть публичными, они нам нужны в тестах?
    public readonly authModal: Locator;
    public readonly codeInput: Locator;
    public readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageUrl = process.env.BaseURL as string; // тут урл страницы авторизации
        this.logo = page.locator('div[class ="header__logo"]');
        this.banner = page.locator('div[class*="banner__text-block"]'); // можно не брать значение атрибута полностью, чтобы локаторы были более простыми и удобными. Можно взять подстроку page.locator('div[class*="banner"]')
        this.phone = page.locator('input[type="tel"]');   // или попробовать этот '.phone-control__input'
        this.loginButton = page.locator('div[class=login-form__btn-submit] button'); // для удобства лучше чейнить локаторы page.locator('div[class=login-form__btn-submit]').locator('button') 
        this.partnerButton = page.locator('button[class ="register-tile register-tile_start-business"]');  // или 'button[class ="register-tile register-tile_start-business"]'
        this.errorAlert = page.locator('div[class="isError message ng-star-inserted"]');  //ng-star-inserted почти у всех ангуляровских компонент - не надо их указывать
        this.codeCountry = page.locator('div[class ="phone-control__country ng-star-inserted"]')
        this.authModal = page.locator('div[class="modal-layout__container-inner"]');
        this.codeInput = page.locator('input[class*=text-control__input-entry]'); // .text-control__input-entry
        this.submitButton = page.locator('button[class ="ui-btn ui-btn-primary ui-btn-primary_m"]'); 
    }
    // методы класса

    public async goto(): Promise<void> {
        console.log('Go to login page');
        await this.page.goto(`${this.pageUrl}/account/login`); // зачем? ты можешь прописать его в файл конфигурации baseUrl и вызывать чисто page.goto('/account/login');
    }
    public async fillPhone(phoneNomber): Promise<void> { // почему не прописываешь типы у параметров функции? - всегда надо, чтобы удобно было работать с твоим кодом потом. Если бы указала, то "as string" в 45 строчке не надо было бы указывать
        console.log('Filling phone');
        await this.phone.fill(phoneNomber as string);
    }
    public async clickLoginButton(): Promise<void> { // старайся делать более простые названия, когда можно, допустим "submitCredentials"
        await this.loginButton.click();
    }
    public async allertFail(): Promise<void> { // название функции не говорит о том, для чего она используется, если функция - это какая-то булевая проверка, то лучше ее назвать "is...", например: "isAuthFailed" + лучше чтобы она возвращала boolean и expect уже делать в самом тесте - так легче читается тест
        console.log('Alert is fail');
        await expect(this.errorAlert).toBeVisible();
    }
    public async checkAuthCode(phoneNomber, page, request): Promise<void> { // у тебя код только при логине запрашивается? Насколько помню - при регистрации тоже, а значит, что при таком подходе ты такой метод еще будешь на странице регистрации писать - значит надо его выносить куда-то выше. + старайся делать функции более атомарными, тут 2 действия: получить код и ввести + отправить его - лучше разделить
        const authResult = await utils.rocketAuth(request); // вообще не понятно что на вход дается, что возвращается.
        await expect(this.authModal).toBeVisible(); // аналогично expect лучше в самом тесте
        const codeSMS = await utils.getCodeFromRocket(phoneNomber as string, request, authResult); // лучше придерживаться camelCase, можно переименовать на sms либо smsCode и будет лучше выглядеть 
        await this.codeInput.fill(codeSMS);
        await this.submitButton.click();
        await expect(page).toHaveURL(`${this.pageUrl}/cabinet/agents`);
        console.log('Auth is successful');

    }


     /*  public async codeCountry(): Promise<void> {   //для смены кода страны
        
    }
    */

}
 
export default LoginPage; // зачем отдельным экспортом, можешь просто дописать, где объявляешь класс