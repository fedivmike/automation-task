import { Locator, Page } from '@playwright/test';
import { InputTestData } from '../testData/inputData';

export class ApplicationFormPage {
    // #region Locators
    private inpFirstName: Locator = this.page.locator(this.getCSSSelector('first_name'));
    private inpLastName: Locator = this.page.locator(this.getCSSSelector('last_name'));
    private inpEmail: Locator = this.page.locator(this.getCSSSelector('email'));
    private inpPassword: Locator = this.page.locator(this.getCSSSelector('password'));
    private inpConfirmPassword: Locator = this.page.locator(this.getCSSSelector('confirm_password'));
    private inpChooseFile: Locator = this.page.locator(this.getCSSSelector('avatar'));
    private btnSubmit: Locator = this.page.locator(`input[type='submit']`);
    private sldThumb: Locator = this.page.locator('#slider-thumb');
    private sldTrack: Locator = this.page.locator('#slider-track');
    private lblErrorMessage: Locator = this.page.locator('form + ul>li');

    //In real solution it would be very unlikely to use locator in the test
    public get firstNameLctr(): Locator {
        return this.inpFirstName;
    }

    public get emailLctr(): Locator {
        return this.inpEmail;
    }
    // #endregion

    constructor(public readonly page: Page) {
        page.goto('/');
    }

    // #region Methods
    public async fillInTheForm(data: InputTestData): Promise<void> {
        await this.setFirstName(data?.firstName);
        await this.setLastName(data?.lastName);
        await this.setEmail(data?.email);
        await this.setPassword(data?.password);
        await this.setConfirmPassword(data.confirmPassword ?? data?.password);
        data.pathToFile && (await this.chooseFile(data.pathToFile));
        data.isSliderUnlocked && (await this.moveSlider());
        await this.clickSubmit();
    }

    public async getErrorMessageTxt(): Promise<string> {
        return await this.lblErrorMessage.innerText();
    }

    public getURL(): string {
        return this.page.url();
    }
    // #endregion

    // #region Helper Methods
    private async setFirstName(value): Promise<void> {
        await this.inpFirstName.fill(value);
    }

    private async setLastName(value): Promise<void> {
        await this.inpLastName.fill(value);
    }

    private async setEmail(value): Promise<void> {
        await this.inpEmail.fill(value);
    }

    private async setPassword(value): Promise<void> {
        await this.inpPassword.fill(value);
    }

    private async setConfirmPassword(value): Promise<void> {
        await this.inpConfirmPassword.fill(value);
    }

    private async chooseFile(value): Promise<void> {
        await this.inpChooseFile.setInputFiles(value);
    }

    private async clickSubmit(): Promise<void> {
        await this.btnSubmit.click();
    }

    private async moveSlider(): Promise<void> {
        const sliderTrack = await this.sldTrack.boundingBox();
        const sliderThumb = await this.sldThumb.boundingBox();
        if (sliderTrack === null || sliderThumb === null) {
            return; // NOTE it's probably better to throw an error here
        }
        const startPoint = {
            x: sliderThumb.x + sliderThumb.width / 2,
            y: sliderThumb.y + sliderThumb.height / 2,
        };

        // Slide it to some endpoint determined by the target percentage
        const endPoint = {
            x: sliderTrack.x + sliderTrack.width * 100,
            y: sliderTrack.y + sliderTrack.height / 2,
        };

        await this.page.mouse.move(startPoint.x, startPoint.y);
        await this.page.mouse.down();
        await this.page.mouse.move(endPoint.x, endPoint.y);
        await this.page.mouse.up();
    }

    private getCSSSelector(value: string): string {
        return `input[name='${value}']`;
    }
    // #endregion
}
