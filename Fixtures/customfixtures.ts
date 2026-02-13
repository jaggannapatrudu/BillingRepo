import {test as base } from '@playwright/test'
import HomePage from '../Pages/HomePage'
import AddToBasket from '../Pages/AddToBasketPage'
import BasketPage from '../Pages/BasketPage'
import PaymentGatewayPage from '../Pages/PaymentGatewayPage'
import OrderConfirmationPage from '../Pages/OrderConfirmationPage'
import MyAccountPage from '../Pages/MyAccountPage'
import BasePage from '../Pages/BasePage'
type MyFixtures = {
    homepage:HomePage,
    addtobasketpage:AddToBasket
    basketpage:BasketPage,
    paymentGatewayPage:PaymentGatewayPage,
    orderconfirmatioPage:OrderConfirmationPage,
    myAccountPage: MyAccountPage
    basePage:BasePage
}
export const test = base.extend<MyFixtures>({

    homepage : async({page}, use)=>{

        let homePage = new HomePage(page)
        await use(homePage)
    },
     addtobasketpage : async({page}, use)=>{

        let addtobasketpage = new AddToBasket(page)
        await use(addtobasketpage)
    },
    basketpage : async({page}, use)=>{

        let basketpage = new BasketPage(page)
        await use(basketpage)
    },
    paymentGatewayPage : async({page}, use)=>{

        let paymentGatewayPage = new PaymentGatewayPage(page)
        await use(paymentGatewayPage)
    },
    orderconfirmatioPage : async({page}, use)=>{

        let orderconfirmatioPage = new OrderConfirmationPage(page)
        await use(orderconfirmatioPage)
    },
    myAccountPage:async({page}, use)=>{
        let myAccountPage=new MyAccountPage(page)
        await use(myAccountPage)
    },
    basePage:async({page}, use)=>{

        let basePage=new BasePage(page)
        await use(basePage)
    }
})