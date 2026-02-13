import {Page, Locator, expect} from '@playwright/test'
import BasePage from './BasePage'
import fs from 'fs'
import DataProvider from '../Utilities/DataProvider'
export default class HomePage extends BasePage
{
    readonly page:Page
    readonly lnkshop:Locator
    readonly lnkMyAccount:Locator
    readonly lnkItems:Locator
    readonly newArrivals:Locator

    constructor(page:Page)
    {
        super(page)
        this.page=page
        this.lnkshop=page.getByRole("link",{name:"Shop"})
        this.lnkMyAccount=page.getByRole("link",{name:"My Account"})
        this.lnkItems=page.getByTitle("Start shopping")
        this.newArrivals = page.locator(".themify_builder_sub_row:nth-child(2)>div>div>div>ul")
    }


    async selectNewArrivalItem(newArrivaliem:string):Promise<number>
    {
        let data = await DataProvider.readDatafromJson('TestData/GlobalData.json')
        
        await this.launchappURL()
        let newArrivals = await this.newArrivals.all()
        let noofNewArrivals = newArrivals.length
        let itemPrice = await this.newArrivals.filter({hasText:newArrivaliem}).locator("[class='price']>span").innerText()
        
        data.price = itemPrice
    
        fs.writeFileSync('TestData/GlobalData.json',JSON.stringify(data,null,2),'utf-8')
        await this.newArrivals.filter({hasText:newArrivaliem}).locator('img').click()
        return noofNewArrivals
    }

}
