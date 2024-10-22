import { Locator, Page, expect } from "@playwright/test";
//import BasePage from '../base_page';
import * as utils from '../../../utils'

class AgentPage {
// свойства класса
public readonly page: Page;
public readonly pageUrl: string;
public readonly newAgentButton: Locator; 
public readonly menuClients: Locator; 
public readonly menuOpportunities: Locator; 
public readonly menuAgents: Locator; 
public readonly phone:Locator;
public readonly email:Locator;
public readonly surname:Locator;
public readonly name:Locator;
public readonly lastname:Locator;


constructor(page: Page) {
    this.page = page;
    this.pageUrl = process.env.BaseURL as string;
    this.newAgentButton = page.locator('');
    this.menuClients = page.locator('a[href="/cabinet/clients"]');
    this.menuOpportunities = page.locator('a[href="/cabinet/applications"]');
    this.phone = page.locator('input[type="tel"]');
    this.email = page.locator('input[data-placeholder="common.control.placeholder.email"]');
    this.surname = page.locator('input[data-placeholder="common.control.placeholder.surname"]');
    this.name = page.locator('input[data-placeholder="common.control.placeholder.name"]');
    this.lastname = page.locator('input[data-placeholder="common.control.placeholder.patronymic"]');

}

// методы класса

public async gotoClients(page): Promise<void> {
    console.log('Go to clients page');
    await this.menuClients.click();
    await expect(page).toHaveURL(`${this.pageUrl}/cabinet/clients`);

}

public async gotoOpportunities(page): Promise<void> {
    console.log('Go to clients page');
    await this.menuOpportunities.click();
    await expect(page).toHaveURL(`${this.pageUrl}/cabinet/applications`);
}

public async gotoNewAgent(page): Promise<void> {
    console.log('Form new fixation');
    await this.newAgentButton.click();
    await expect(page).toHaveURL(`${this.pageUrl}/cabinet/agents/new-agent`);

}

public async fillPhone(phoneNomber: string): Promise<void> {
    console.log('Filling phone');
    await this.phone.fill(phoneNomber);
    
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

}

export default AgentPage;