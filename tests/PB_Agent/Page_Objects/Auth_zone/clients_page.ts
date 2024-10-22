import { Locator, Page, expect } from "@playwright/test";
//import BasePage from '../base_page';
import * as utils from '../../../utils'

class ClientPage {
// свойства класса
public readonly page: Page;
public readonly pageUrl: string;
public readonly newFixButton: Locator;
public readonly phone:Locator;
public readonly email:Locator;
public readonly surname:Locator;
public readonly name:Locator;
public readonly lastname:Locator; 
public readonly comment:Locator;
public readonly objectInt:Locator;
public readonly objectList:Locator;
public readonly agreePersonal:Locator;
public readonly sendButton:Locator;
public readonly pageClient:Locator;
public readonly phoneAdd:Locator;
public readonly phoneAddButton:Locator;


constructor(page: Page) {
    this.page = page;
    this.pageUrl = process.env.BaseURL as string;
    this.newFixButton = page.locator('div.clients-list__header button');
    this.phone = page.locator('input[type="tel"]');
    this.email = page.locator('input[data-placeholder="common.control.placeholder.email"]');
    this.surname = page.locator('input[data-placeholder="common.control.placeholder.surname"]');
    this.name = page.locator('input[data-placeholder="common.control.placeholder.name"]');
    this.lastname = page.locator('input[data-placeholder="common.control.placeholder.patronymic"]');
    this.comment = page.locator('textarea[type="text"]');
    this.objectList = page.locator('button[class*=select-simple-autocomplete-value-accessor__button]');
    this.objectInt = page.locator('div[class="drop-down-list__info"]').nth(2);
    this.agreePersonal = page.locator('span[class="checkbox__box"]');
    this.sendButton = page.locator('button[class="ui-btn ui-btn_type_primary ui-btn_size_m"]');
    this.pageClient = page.locator('div.client');
    this.phoneAdd = page.locator('input[type="tel"]').nth(1);
    this.phoneAddButton = page.locator('button[class="ui-btn ui-btn-link ui-btn-link_type_primary ui-btn_size_m"]');
 

}

// методы класса

public async gotoNewFix(page): Promise<void> {
    console.log('Form new fixation');
    await this.newFixButton.click();
    await expect(page).toHaveURL(`${this.pageUrl}/cabinet/clients/fixation`);

}

public async fillPhone(phoneNomber: string): Promise<void> {
    console.log('Filling phone');
    await this.phone.fill(phoneNomber);
    
}

public async fillAddPhone(phoneNomber: string): Promise<void> {
    console.log('Filling add phone');
    await this.phoneAddButton.click();
    await this.phoneAdd.fill(phoneNomber);
    
}

public async fillEmail(email: string): Promise<void> {
    console.log('Filling email');
    await this.email.fill(email);
    
}

public async fillName(surname: string, name: string, lastname: string): Promise<void> {
    console.log('Filling name');
    await this.surname.fill(surname);
    await this.name.fill(name);
    await this.lastname.fill(lastname);
    
}

public async fillComment(text: string): Promise<void> {
    console.log('Filling comment');
    await this.comment.fill(text);
    
}

public async fillObjectInterest(page): Promise<void> {
    console.log('Object of Interest');
    await this.objectList.click();
    await this.objectInt.click();
    await page.keyboard.press('Enter');
    
}

public async agreePersonalData(): Promise<void> {
    console.log('Agreement of personal data');
    await this.agreePersonal.click();
    
}

public async clickSendButton(page): Promise<void> {
    console.log('Send fixation');
    await this.sendButton.click();
    await expect(this.pageClient).toBeVisible();

}


}

export default ClientPage;