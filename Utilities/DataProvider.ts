import fs from 'fs'

export default class DataProvider
{

    static async readDatafromJson(filepath:string):Promise<any>
    {
            let data = JSON.parse(fs.readFileSync(filepath,'utf-8'))
            return data
    }
}
