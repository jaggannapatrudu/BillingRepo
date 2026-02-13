import { Page, expect, Locator } from '@playwright/test'
import DataProvider from '../Utilities/DataProvider'
import fs from 'fs'
export default class BasketPage {
    readonly page: Page
    readonly table: Locator
    readonly btnUpdateBasket: Locator
    readonly btnProceedToCheckout: Locator
    readonly btnApplyCoupon: Locator
    readonly subTotal: Locator
    readonly tax: Locator
    readonly finalTotal: Locator
    
    constructor(page: Page) {
        this.page = page
        this.table = page.locator('.cart_item')
        this.btnUpdateBasket = page.locator("[value='Update Basket']")
        this.btnProceedToCheckout = page.locator(".wc-proceed-to-checkout>a")
        this.btnApplyCoupon = page.locator("[value='Apply Coupon']")
        this.subTotal = page.locator(".woocommerce-Price-amount.amount").nth(2)
        this.tax = page.locator(".woocommerce-Price-amount.amount").nth(3)
        this.finalTotal = page.locator(".woocommerce-Price-amount.amount").nth(4)
        
    }

    async proceedToCheckOut() {
        let data = await DataProvider.readDatafromJson('TestData/GlobalData.json')
        let table = this.table.filter({ hasText: data.itemName })
        let itemName = await table.locator('td').nth(2).innerText()
        expect(itemName).toContain(data.itemName)
        await table.locator('td').nth(4).locator('input').fill('100')
        await this.page.waitForTimeout(1000)
        await this.page.keyboard.press('Tab')
        await this.page.waitForTimeout(1000)
        await this.btnUpdateBasket.click()
        await expect(this.btnUpdateBasket).toBeDisabled()
        let itemPrice = await table.locator('td').nth(3).innerText()
        let itemPrice1 = itemPrice.replace('₹', '')
        let itemQuantity = await table.locator('td').nth(4).locator('input').inputValue()
        let finalPrice = parseFloat(itemPrice1) * parseFloat(itemQuantity)
        let finalprice1 = '₹' + finalPrice.toString() + '.00'
        let itemTotal = await table.locator('td').nth(5).innerText()
        
        let itemTotal1 = itemTotal.replaceAll(',', '')
        let subtottal = await this.subTotal.innerText()
        let tax = await this.tax.innerText()
        let values = [subtottal, tax]
        const total = values.reduce((sum, val) => sum + parseFloat(val.replaceAll('₹', '').replaceAll(',', '')), 0);
        const formattedTotal = `₹${total.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
        let finalTotal = await this.finalTotal.innerText()
         data.totalPrice = formattedTotal
        fs.writeFileSync('TestData/GlobalData.json', JSON.stringify(data,null,2),'utf-8')
        expect(finalprice1).toContain(itemTotal1)
        expect(itemTotal).toBe(subtottal)
        expect(finalTotal).toBe(formattedTotal)
        await this.btnProceedToCheckout.click()


    }
}