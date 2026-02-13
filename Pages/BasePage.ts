
import {Page} from '@playwright/test'
import DataProvider from '../Utilities/DataProvider'

export default class BasePage
{
    readonly page:Page

    constructor(page:Page)
    {
        this.page=page
    }
    async launchappURL()
    {
        try{
            let data = await DataProvider.readDatafromJson('TestData/GlobalData.json')
            await this.page.goto(data.url)
        }
        catch{
            throw new Error('Application not launched')
        }

    }
}