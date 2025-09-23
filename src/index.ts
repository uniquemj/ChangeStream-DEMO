import { MongoClient } from "mongodb";
import 'dotenv/config'
import { watchCollection } from "./config";

const MONGODB_URL = process.env.MONGODB_URL as string
const DATABASE_NAME = process.env.DATABASE_NAME as string
const COLLECTION_NAME = process.env.COLLECTION_NAME as string

const client = new MongoClient(MONGODB_URL)

const main = async() =>{
    try{
        await client.connect()
        console.log('Connected to DB.')

        const db = client.db(DATABASE_NAME)

        console.log('Watch Collection . . .')
        await watchCollection(db, COLLECTION_NAME)
    }catch(e){
        console.log('Error while connecting to db: ',e)
    }
}

main()