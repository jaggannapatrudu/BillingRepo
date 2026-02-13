
import {test, Page} from '@playwright/test'

export async function stepWithScreenshot(page: Page, stepName: string) 
{
  await test.step(stepName, async () => {


    const screenshot = await page.screenshot({fullPage:true});
    await test.info().attach(stepName, {
      body: screenshot,
      contentType: 'image/png'
    });
  });
}