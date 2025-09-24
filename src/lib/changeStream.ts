import { Db } from "mongodb";
import { insert, remove, update } from "./fileFunctions";

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

    const pipeline = [
        {$match: {'fullDocument.status':'not-imp'}},
        {$addFields: {newFields: 'This is new field added'}}
    ] // This pipeline will modify the change stream event document output with addition field 'newFields' for where 'fullDocument.status' is 'imp'

    const changeStream = db.watch([], {fullDocument: 'updateLookup'}) // {fullDocument: 'updateLookup'} this will include fullDocument field for update operation.
    // const next = await changeStream.next() // alternative approach to .on('change', () => {})
    // console.log("Next:", next) 

    // Payload -> Change Stream Events Docs
    changeStream.on('change', async(payload)=>{
        switch(payload.operationType){
            case 'insert':
                const data = payload.fullDocument as Tasks
                await insert(data)
                break
            case 'delete':
                const removeID = String(payload.documentKey._id)
                await remove(removeID)
                break
            case 'update':
                const updateID = String(payload.documentKey._id)
                const updateFields = {...payload.updateDescription.updatedFields}
                await update(updateID, updateFields)
                break
            default:
                throw new Error('Invalid operation Type.')
        }
    }).once('error', (e)=>{
        console.log(e)
    })
}