import { Locator, Page, expect } from "@playwright/test";
import RegistrationPage from './registr_page.ts';
import * as utils from '../../../utils'


class RegistrationNonPage {
// свойства класса
    public readonly page: Page;
    public readonly pageUrl: string;
    public readonly nonButton: Locator;  
    public readonly phone:Locator;
    public readonly email:Locator;
    public readonly surname:Locator;
    public readonly name:Locator;
    public readonly lastname:Locator;
    public readonly codeCountryButton: Locator;  
    public readonly countryCode: Locator;
    public readonly commentButton: Locator;
    public readonly instructionsButton: Locator;
    public readonly instructionsAgreement: Locator;
    public readonly personalAgreement: Locator;
    public readonly offerButton: Locator;
    public readonly offerAgreement: Locator;


    constructor(page: Page) {
        this.page = page;
        this.pageUrl = process.env.BaseURL as string;
        this.nonButton = page.locator('button[class="select-button is-last ng-star-inserted"]');
        this.phone = page.locator('input[type="tel"]');
        this.email = page.locator('input[data-placeholder="common.action.enter"]');
        this.surname = page.locator('input[data-placeholder="common.control.placeholder.surname"]');
        this.name = page.locator('input[data-placeholder="common.control.placeholder.name"]');
        this.lastname = page.locator('input[data-placeholder="common.control.placeholder.patronymic"]');
        this.codeCountryButton = page.locator('');
        this.countryCode = page.locator('');
        this.commentButton = page.locator('button[class="ui-btn ui-btn_type_primary ui-btn_size_m"]');
        this.instructionsButton = page.locator('button[class="ui-btn ui-btn_type_primary ui-btn_size_m"]');
        this.instructionsAgreement = page.locator('div.instructions div:nth-child(4) span.checkbox__text'); 
        this.personalAgreement = page.locator('div.instructions div:nth-child(5) span.checkbox__text');
        this.offerButton = page.locator('button[class="ui-btn ui-btn_type_primary ui-btn_size_m"]'); 
        this.offerAgreement = page.locator('span[class="checkbox__box"]');
       
    }

    public async goto(): Promise<void> {
        console.log('Go to Non.reg.form');
        await this.nonButton.click();
    }
    
    public async fillPhone(phoneNomber: string): Promise<void> {
        console.log('Filling phone');
        await this.phone.fill(phoneNomber);
        
    }

    public async fillEmail(email: string): Promise<void> {
        console.log('Filling email');
        await this.email.fill(email);
        
    }

    public async fillDirName(surname: string, name: string, lastname: string): Promise<void> {
        console.log('Filling director`s name');
        await this.surname.fill(surname);
        await this.name.fill(name);
        await this.lastname.fill(lastname);
        
    }

    public async commentPage(): Promise<void> {
        console.log('Comment page');
        await this.commentButton.click();
        
    }

    public async agreementPage(): Promise<void> {
        console.log('Agreement page');
        await this.offerAgreement.click();
        await this.offerButton.click();
    }
    

    public async instructionPage(page): Promise<void> {
        console.log('instruction page');
        await this.instructionsAgreement.click();
        await this.personalAgreement.click();
        await this.instructionsButton.click();
        await page.waitForTimeout(2000);   
        await expect(page).toHaveURL(`${this.pageUrl}/cabinet/agents`);
        console.log('Successful');
        
    }



}

export default RegistrationNonPage;