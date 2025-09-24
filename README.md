# MongoDB Change Stream Demo

This project demonstrates how to use **MongoDB Change Streams** to listen for real-time changes (insert, update, delete, etc.) in a collection.  

Change Streams allow applications to subscribe to changes in MongoDB collections without the need for polling, making it useful for event-driven systems, notifications, and real-time updates.

---

## Requirements

- Node.js (>=16)
- TypeScript
- MongoDB (running in **replica set mode**, since change streams require replica sets)

---

## Setting up MongoDB Replica Set

Change Streams require MongoDB to run as a **replica set**. If you are running MongoDB locally, follow these steps:

**For Windows:**
1. Stop any running `mongod` process.

    ```bash
    net stop MongoDB
2. Make a folder for replica set data.

    ```bash
    mkdir E:\mongodb-rs0
3. Start MongoDB with replica set enabled:

   ```bash
   mongod --dbpath E:\mongo-rs0 --replSet rs0 --port 27017
4. Open another terminal and connect with `mongosh`

    ```bash
    mongosh --port 27017
5. Initialize the replica set, inside `mongosh`, run:

    ```bash
    rs.initiate()
6. Verify replica set status:

    ```bash
    rs.status()
Once the replica set is initialized, you can use change streams.

## Running the Project

1. Install dependencies:
    
    ```bash
    npm install
2. Build TypeScript into JavaScript:
    
    ```bash
    npm run build
3. Start the project:

    ```bash
    npm run start
This will run the index.js file and start listening for MongoDB collection changes.
