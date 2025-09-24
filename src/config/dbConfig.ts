import { MongoClient } from 'mongodb';

export const connectToMongoDB = async(MONGODB_URL: string): Promise<MongoClient> =>{
    const client = new MongoClient(MONGODB_URL)
    try{
        console.log('Connecting with MongoDB . . .')
        await client.connect()
        console.log('Connected to MongoDB . . .')
        return client
    }catch(e){
        console.log('Error Connecting to MongoDB')
        process.exit(0)
    }
}