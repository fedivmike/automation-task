import { Locator, Page } from '@playwright/test';

export class SuccessPage {
    //#region Locators
    private header: Locator = this.page.locator('h1');
    private txtData: Locator = this.page.locator('li');
    private img: Locator = this.page.locator('li>img');
    //#endregion

    constructor(public readonly page: Page) {}

    //#region Methods
    public async getHeaderTxt(): Promise<string> {
        return await this.header.innerText();
    }

    public async getData(): Promise<string> {
        return await this.txtData.innerText();
    }

    public getURL(): string {
        return this.page.url();
    }

    public async isImageVisible(): Promise<boolean> {
        await this.page.waitForURL('**/success');
        return await this.img.isVisible();
    }
    //#endregion
}
