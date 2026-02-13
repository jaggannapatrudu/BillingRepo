import {test} from '../Fixtures/customfixtures'
import { expect, Page} from '@playwright/test'
import DataProvider from '../Utilities/DataProvider'
import {stepWithScreenshot} from '../Utilities/Screenshotcapture'
test('Place order', async({page, homepage, addtobasketpage, basketpage, paymentGatewayPage, orderconfirmatioPage})=>{
    test.slow()
    let data = await DataProvider.readDatafromJson('TestData/GlobalData.json')
    let noofNewArrivals = await homepage.selectNewArrivalItem(data.itemName)
    expect(noofNewArrivals).toBe(3)
    await addtobasketpage.ItemAddToBasket()
    await stepWithScreenshot(page,"Added item to basket")
    await basketpage.proceedToCheckOut()
     await stepWithScreenshot(page,"proceed to checkout")
    await paymentGatewayPage.enterBillingDetails()
     await stepWithScreenshot(page,"Billing details")
    await orderconfirmatioPage.orderDetailsVerification()
     await stepWithScreenshot(page,"order verification")
    await page.waitForTimeout(10000)
    

})