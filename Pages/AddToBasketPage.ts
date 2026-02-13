import { expect, Locator, Page } from '@playwright/test'
import DataProvider from '../Utilities/DataProvider'
export default class AddToBasket {
    readonly page: Page
    readonly itemName: Locator
    readonly btnAddToBasket: Locator
    readonly price: Locator
    readonly messag: Locator
    readonly lnkViewBasket: Locator
    constructor(page: Page) {
        this.page = page
        this.itemName = page.locator(".product_title.entry-title")
        this.btnAddToBasket = page.getByRole("button", { name: 'Add to basket' })
        this.price = page.locator("[itemprop='offers']>p>span")
        this.messag = page.locator(".woocommerce-message")
        this.lnkViewBasket = page.getByRole('link', { name: 'View Basket' })
    }

    async ItemAddToBasket() {
        try {
            let data = await DataProvider.readDatafromJson('TestData/GlobalData.json')
            let itemName = await this.itemName.innerText()
            expect(itemName).toContain(data.itemName)
            let price = await this.price.textContent()
            expect(price).toBe(data.price)
            await this.btnAddToBasket.click()
            await expect(this.messag).toHaveText(/has been added to your basket./)
            await this.lnkViewBasket.click()
        }
        catch (error) {
            return error
        }
    }

}