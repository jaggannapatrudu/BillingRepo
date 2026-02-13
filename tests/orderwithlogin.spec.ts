
import {test} from '../Fixtures/customfixtures'
import {expect} from '@playwright/test'
import {stepWithScreenshot} from '../Utilities/Screenshotcapture'
import DataProvider from '../Utilities/DataProvider'
test('Order placed with user registration', async({page,myAccountPage, basePage,homepage, addtobasketpage, basketpage, paymentGatewayPage, orderconfirmatioPage})=>{
test.slow()
     await basePage.launchappURL()
     let data:any = await myAccountPage.AccountRegistration()
     await myAccountPage.AppLogin(data.emailAddress, data.regpassword)
    let data1 = await DataProvider.readDatafromJson('TestData/GlobalData.json')
    let noofNewArrivals = await homepage.selectNewArrivalItem(data1.itemName)
    expect(noofNewArrivals).toBe(3)
    await addtobasketpage.ItemAddToBasket()
    await stepWithScreenshot(page,"Added item to basket")
    await basketpage.proceedToCheckOut()
    await stepWithScreenshot(page,"proceed to checkout")
    await paymentGatewayPage.enterBillingDetails()
    await stepWithScreenshot(page,"Billing details")
    await orderconfirmatioPage.orderDetailsVerification()
    await stepWithScreenshot(page,"order verification")
    await page.waitForTimeout(2000)
})

