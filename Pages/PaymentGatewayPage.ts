import { Page, Locator } from '@playwright/test'
import RandomDataGenerator from '../Utilities/RandomDataGenerator'
import DataProvider from '../Utilities/DataProvider'
export default class PaymentGatewayPage {

    readonly page: Page
    readonly lnkenteryourCode: Locator
    readonly txtFirstName: Locator
    readonly txtLastName: Locator
    readonly txtCompanyName: Locator
    readonly txtEmailAddress: Locator
    readonly txtPhone: Locator
    readonly txtorderNotes: Locator
    readonly lstCountry: Locator
    readonly txtCountrySearch: Locator
    readonly lstCoutries: Locator
    readonly txtAddress: Locator
    readonly txtApratment: Locator
    readonly txtCity: Locator
    readonly txtState: Locator
    readonly lstStates: Locator
    readonly txtpostalCode: Locator
    readonly elecheckPayments: Locator
    readonly btnPlaceOrder: Locator
    constructor(page: Page) {
        this.page = page
        this.lnkenteryourCode = page.getByRole("link", { name: 'Click here to enter your code' })
        this.txtFirstName = page.getByLabel("First Name")
        this.txtLastName = page.getByLabel("Last Name")
        this.txtCompanyName = page.getByLabel("Company Name")
        this.txtEmailAddress = page.getByLabel("Email Address")
        this.txtPhone = page.getByLabel("Phone")
        this.txtorderNotes = page.getByLabel("Order Notes")
        this.lstCountry = page.locator("#select2-chosen-1")
        this.txtCountrySearch = page.locator("#s2id_autogen1_search")
        this.lstCoutries = page.locator("#select2-results-1 li div")
        this.txtAddress = page.getByPlaceholder("Street address")
        this.txtApratment = page.locator("#billing_address_2")
        this.txtCity = page.getByLabel("Town / City")
        this.txtState = page.locator("[id^='select2-chose']").last()
        this.lstStates = page.locator(".select2-results").last().locator("li div")
        this.txtpostalCode = page.locator("#billing_postcode").first()
        this.elecheckPayments = page.locator("#payment_method_cheque")
        this.btnPlaceOrder = page.locator("#place_order")
    }

    async enterBillingDetails() {
        
        await this.txtFirstName.fill(RandomDataGenerator.getFirstName())
        await this.txtLastName.fill(RandomDataGenerator.getLastName())
        await this.txtCompanyName.fill(RandomDataGenerator.getCompanyName())
        await this.txtEmailAddress.fill(RandomDataGenerator.getEmailAddress())
        await this.txtPhone.fill(RandomDataGenerator.getPhone())
        await this.txtorderNotes.fill('order notes')
        await this.lstCountry.click()
        let allCountries = await this.lstCoutries.all()
        for (let cntry of allCountries) {
            let value = await cntry.innerText()
            if (value.trim() == 'India') {
                await cntry.click()
                break
            }
        }
        await this.txtAddress.fill(RandomDataGenerator.getAddress())
        await this.txtApratment.fill(RandomDataGenerator.getApartment())
        await this.txtCity.fill(RandomDataGenerator.getcity())
        await this.txtState.click()
        let allSTates = await this.lstStates.all()
        let stateName = RandomDataGenerator.getState()
        for (let state of allSTates) {
            let value = await state.innerText()

            if (value.trim() == 'Andhra Pradesh') {
                await state.click()
                break
            }
        }
        await this.txtpostalCode.fill(RandomDataGenerator.getPostalcode())

        await this.btnPlaceOrder.click()

    }
}