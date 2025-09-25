import { Db} from "mongodb";
import { Method } from "../types/seed";

/**
 * Perform write operations(insert, remove, delete) into mongodb collection for every 10 secs..
 * @param {Db} db - The MongoDB database instance.
 * @param {string} collection_name - The name of the collection where operation is to be perform.
 * @description
 * This function will perform random operation over mongodb collection every 10 sec.
 */

export const seedDataToMongoDB = async(db: Db, collection_name: string) =>{
    console.log('Seeding data . . .')
    const data = [
        {
            "ordinal": 1,
            "added_by": "Ram",
            "title": "Gym Workout",
            "description": "Go to the gym for strength training session.",
            "status": "completed",
            "due_date": "2025-05-07T00:00:00.000Z",
            "created_at": "2025-05-07T09:00:00.000Z"
        },
        {
            "ordinal": 2,
            "added_by": "Sita",
            "title": "Morning Jog",
            "description": "Jog for 3 kilometers in the park.",
            "status": "pending",
            "due_date": "2025-05-08T06:30:00.000Z",
            "created_at": "2025-05-07T07:00:00.000Z"
        },
        {
            "ordinal": 3,
            "added_by": "Hari",
            "title": "Read a Book",
            "description": "Finish 20 pages of the science fiction novel.",
            "status": "in-progress",
            "due_date": "2025-05-09T00:00:00.000Z",
            "created_at": "2025-05-07T08:15:00.000Z"
        },
        {
            "ordinal": 4,
            "added_by": "Gita",
            "title": "Buy Groceries",
            "description": "Purchase fruits, vegetables, and bread from the store.",
            "status": "not-imp",
            "due_date": "2025-05-10T00:00:00.000Z",
            "created_at": "2025-05-07T10:20:00.000Z"
        },
        {
            "ordinal": 5,
            "added_by": "Shyam",
            "title": "Complete Project Report",
            "description": "Prepare and submit the final report for the project.",
            "status": "pending",
            "due_date": "2025-05-11T23:59:59.000Z",
            "created_at": "2025-05-07T11:45:00.000Z"
        }
    ]

    const collection = db.collection(collection_name)
    const method: Method[] = [
    {
        detail: "insert",
        fn: (doc: Partial<TaskInput>) => collection.insertOne(doc),
    },
    {
        detail: "delete",
        fn: (filter: { ordinal: number }) => collection.deleteOne(filter),
    },
    {
        detail: "update",
        fn: (filter: { ordinal: number }, data: Partial<Tasks>) =>
        collection.updateOne(filter, { $set: data }),
    },
    ];

    setInterval(async () => {
    let randomNumber = Math.floor(Math.random() * 5);
    let randomMethod = Math.floor(Math.random() * method.length);

    let useMethod = method[randomMethod];

    switch (useMethod.detail) {
        case "insert":
            await useMethod.fn(data[randomNumber]);
            break;

        case "delete":
            await useMethod.fn({ ordinal: randomNumber });
            break;

        case "update":
            await useMethod.fn({ ordinal: randomNumber }, { status: "updated" });
            break;

        default:
            throw new Error("Invalid method");
    }
    }, 10000);
}