import { Locator, Page, expect } from "@playwright/test";
import RegistrationPage from './registr_page.ts';
import * as utils from '../../../utils'


class RegistrationNonPage extends RegistrationPage{
// свойства класса

    public readonly nonButton: Locator;  
    public readonly phone:Locator;
    public readonly email:Locator;
    public readonly surname:Locator;
    public readonly name:Locator;
    public readonly lastname:Locator;
    public readonly codeCountryButton: Locator;  
    public readonly countryCode: Locator;


    constructor(page: Page) {
        super(page);
        this.nonButton = page.locator('');
        this.phone = page.locator('');
        this.email = page.locator('');
        this.surname = page.locator('');
        this.name = page.locator('');
        this.lastname = page.locator('');
        this.codeCountryButton = page.locator('');
        this.countryCode = page.locator('');
       
    }

    public async goto(): Promise<void> {
        console.log('Go to Non.reg.form');
        await expect(this.registrForm).toBeVisible();
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












}

export default RegistrationNonPage;