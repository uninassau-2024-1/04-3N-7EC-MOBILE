/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";
import { configs, test } from "../../../../utils/test/playwright/index";
/**
 * This behavior does not vary across directions
 */
configs({ directions: ['ltr'] }).forEach(({ config, title }) => {
    test.describe(title('picker column option: a11y'), () => {
        test('should not have accessibility violations', async ({ page }) => {
            await page.goto(`/src/components/picker-column-option/test/a11y`, config);
            const results = await new AxeBuilder({ page }).analyze();
            expect(results.violations).toEqual([]);
        });
    });
});
