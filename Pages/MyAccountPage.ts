import {Locator, Page, expect} from '@playwright/test'
import RandomDataGenerator from '../Utilities/RandomDataGenerator'
import DataProvider from '../Utilities/DataProvider'
import fs from 'fs'
export default class MyAccountPage
{

        readonly page:Page
        readonly lnkMyAccount:Locator
        readonly txtLoginUsername:Locator
        readonly txtLoginPassword:Locator
        readonly btnLogin:Locator
        readonly txtRegisterEmailAddress:Locator
        readonly txtRegisterPassword:Locator
        readonly btnRegister:Locator
        readonly lnkDashboard:Locator
        readonly eleStrong:Locator
        readonly lnkLogout:Locator
        readonly imgAutomationPractice:Locator
        constructor(page:Page)
        {
                this.page=page
                this.lnkMyAccount=page.getByRole('link',{name:'My Account'})
                this.txtLoginUsername=page.getByRole('textbox',{name:'Username or email address'})
                this.txtLoginPassword = page.locator("#password")
                this.btnLogin = page.locator("[name='login']")
                this.txtRegisterEmailAddress = page.getByRole('textbox',{name:'Email address'}).nth(1)
                this.txtRegisterPassword = page.locator("#reg_password")
                this.btnRegister = page.locator("[name='register']")
                this.lnkDashboard = page.getByRole('link',{name:'Dashboard'})
                this.eleStrong = page.locator(".woocommerce-password-strength")
                this.lnkLogout = page.getByRole('link',{name:'Logout'}).first()
                this.imgAutomationPractice = page.getByAltText("Automation Practice Site")
        }

        async AccountRegistration():Promise<{}>
        {
            try{
                
                let emailAddress = RandomDataGenerator.getEmailAddress()
                let regpassword = RandomDataGenerator.getPassword()
                await this.lnkMyAccount.click()
                await this.page.waitForResponse(res=>res.url().includes('my-account'))
                await expect(this.txtRegisterEmailAddress).toBeEditable()
                await this.txtRegisterEmailAddress.fill(emailAddress)
                 await this.txtRegisterPassword.fill(regpassword)
               await this.page.waitForTimeout(1000)
               await this.txtRegisterPassword.clear()
               await this.page.waitForTimeout(1000)
                 await this.txtRegisterPassword.fill(regpassword)
                 await this.page.waitForTimeout(1000)
                 await this.page.keyboard.press('Tab')
                 await expect(this.eleStrong).toBeVisible()
                await this.btnRegister.click()
                await this.lnkLogout.click()
                return {emailAddress, regpassword}
            }
           catch(error)
           {
                throw error
           }
        }

        async AppLogin(emailAddress:string, password:string)
        {
            try
            {
                await this.txtLoginUsername.fill(emailAddress)
                await this.txtLoginPassword.fill(password)
                await this.btnLogin.click()
                await expect(this.lnkLogout).toBeVisible()
                await this.imgAutomationPractice.click()
            
                await this.page.waitForTimeout(2000)
            }
            catch(error)
            {
                throw error
            }
        }





}