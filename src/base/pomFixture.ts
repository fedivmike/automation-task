import { test as _baseTest } from '@playwright/test';
import { ApplicationFormPage } from '../pages/ApplicationFormPage';
import { SuccessPage } from '../pages/successPage';

type pages = {
    applicationFormPage: ApplicationFormPage;
    successPage: SuccessPage;
};

const testPages = _baseTest.extend<pages>({
    applicationFormPage: async ({ page }, use) => {
        await use(new ApplicationFormPage(page));
    },
    successPage: async ({ page }, use) => {
        await use(new SuccessPage(page));
    },
});

export const test = testPages;
