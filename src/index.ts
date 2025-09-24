import 'dotenv/config'
import { watchCollection } from "./lib/changeStream";
import { connectToMongoDB} from "./config/dbConfig";

const MONGODB_URL = process.env.MONGODB_URL as string
const DATABASE_NAME = process.env.DATABASE_NAME as string
const COLLECTION_NAME = process.env.COLLECTION_NAME as string

const main = async() =>{
        const client = await connectToMongoDB(MONGODB_URL)
        const db = client.db(DATABASE_NAME)
        console.log('Watch Collection . . .')
        await watchCollection(db, COLLECTION_NAME)
}

main()