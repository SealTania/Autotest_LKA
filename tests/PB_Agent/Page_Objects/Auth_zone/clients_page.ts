import { Locator, Page, expect } from "@playwright/test";
//import BasePage from '../base_page';
import * as utils from '../../../utils'

class ClientPage {
// свойства класса
public readonly page: Page;
public readonly pageUrl: string;
public readonly newFixButton: Locator; 
public readonly menuclient: Locator; 


constructor(page: Page) {
    this.page = page;
    this.pageUrl = process.env.BaseURL as string; // тут урл страницы авторизации

}

// методы класса

public async goto(): Promise<void> {
    console.log('Go to clients page');



}
}