import {MongoClient , ServerApiVersion, Db, Collection} from 'mongodb';
import MONGO_URI from '../config/mongodb-config';
import 'dotenv/config';
import {config} from 'dotenv';

const client = new MongoClient(MONGO_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

const connectMongoDB = async(): Promise<void>=>{
    try{
        await client.connect();
        const db: Db = client.db("e_commerce");
        await db.command({ ping : 1});
        console.log("Pinged your deployemnent.You succsesfully connected to MongoDB");
    }
    catch(err){
        console.log("mongodb error is ",err)
    }
};

const stopMongoDb = async() : Promise<void> => {
    try{
    await client.close();
    }
    catch(err){
        console.log("mongodb error is ",err);
    }
}
export {client,connectMongoDB,stopMongoDb};
