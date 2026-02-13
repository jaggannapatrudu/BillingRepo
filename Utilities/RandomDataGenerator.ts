import {faker} from '@faker-js/faker'

export default class RandomDataGenerator
{


   static getFirstName():string
    {
        return faker.person.firstName()
    }
     static getLastName():string
    {
        return faker.person.lastName()
    }
    static getPassword():string
    {
        let randomNumber = Math.floor(Math.random()*100)
        return faker.internet.password()+randomNumber+'%#$534123fgdfgdfgsda'
    }
     static getCompanyName():string
    {
        return faker.company.name()
    }
     static getEmailAddress():string
    {
        return faker.internet.email()
    }
     static getPhone():string
    {
        return faker.phone.number({"style":'international'})
    }
     static getAddress():string
    {
        return faker.location.streetAddress()
    }
     static getApartment():string
    {
        return faker.location.buildingNumber()
    }
     static getcity():string
    {
        return faker.location.city()
    }
     static getState():string
    {
        return faker.location.state()
    }
     static getPostalcode():string
    {
        return faker.location.zipCode()
    }

}