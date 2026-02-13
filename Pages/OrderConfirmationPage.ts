import {Page, Locator, expect} from '@playwright/test'
import DataProvider from '../Utilities/DataProvider'
import fs from 'fs'
export default class OrderConfirmationPage
{
    readonly page:Page
    readonly confirmMsg:Locator
    readonly orderNumberDetails:Locator
    readonly orderDetails:Locator

    constructor(page:Page)
    {
        this.page=page
        this.confirmMsg = page.locator(".woocommerce-thankyou-order-received")
        this.orderNumberDetails = page.locator(".order_details li strong")
        this.orderDetails = page.locator(".shop_table.order_details tfoot tr td")
    }

    async orderDetailsVerification()
    {
        let data = await DataProvider.readDatafromJson('TestData/GlobalData.json')
        await expect(this.confirmMsg).toHaveText('Thank you. Your order has been received.')
        let orderNumber = await this.orderNumberDetails.first().innerText()
        let OrdertotalPrice = await this.orderNumberDetails.nth(2).innerText()
        let orderdetailsTotalPrice = await this.orderDetails.last().innerText()
        expect(OrdertotalPrice).toBe(data.totalPrice)
        expect(orderdetailsTotalPrice).toBe(data.totalPrice)
        data.orderNumber = orderNumber
        fs.writeFileSync('TestData/GlobalData.json', JSON.stringify(data,null,2),'utf-8')


    }


}