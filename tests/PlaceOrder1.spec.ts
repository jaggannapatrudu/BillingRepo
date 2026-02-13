import {test} from '@playwright/test'

test('', async({page})=>{

    await page.goto('https://in.tradingview.com/chart/BdgltnsB/?symbol=NSE%3ANIFTY')
})