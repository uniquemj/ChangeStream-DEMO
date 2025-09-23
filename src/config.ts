import { Db } from "mongodb";

/**
 * Watches a MongoDB collection for real-time changes using Change Streams.
 * @param {Db} db - The MongoDB database instance.
 * @param {string} collection_name - The name of the collection to watch.
 * @description
 * This function opens a change stream on the specified collection and listens for changes.
 * Whenever a change (insert, update, delete, replace, etc.) occurs in the collection,
 * the payload describing the change is logged to the console.
 * It also listens for an error event once, logging the error if the change stream fails.
 */
export const watchCollection = async( db:Db, collection_name: string) =>{
    const collection = db.collection(collection_name)
    const changeStream = collection.watch()

    changeStream.on('change', (payload)=>{
        console.log('Payload: ',payload)
    }).once('error', (e)=>{
        console.log(e)
    })
}