import express, { query, request, response } from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import {roomRouter} from "./routes/room.js";
import { customerRouter } from './routes/customer.js';
import { customerByQuery, getCustomerById, editById, deleteById, createCustomer } from './customermethod.js';

dotenv.config();
// console.log(process.env);
const app=express();
const PORT=process.env.PORT;
app.use(express.json());
const MONGO_URL=process.env.MONGO_URL;
async function createConnection(){
  const client= new MongoClient(MONGO_URL);
  await client.connect();
  console.log("mongodb is connected");
  return client;
}
export const client=await createConnection();
app.get("/",(request,response)=>{
    response.send("hello world")
});
//listing all room with booked customer data
app.get("/roomdetails",async (request,response)=>{
  const roomdetail=await client.db('hallbooking').collection('booking').aggregate([
    { $lookup:
       {
         from: 'room',
         localField: 'room_id',
         foreignField: 'id',
         as: 'roomdetails'
       }
     }
    ]).toArray();
    response.send(roomdetail);
})
//list all customer with booked data
app.get("/customerdetails",async (request,response)=>{
  const customerdetail=await client.db('hallbooking').collection('room').aggregate([
    { $lookup:
       {
         from: 'booking',
         localField: 'id',
         foreignField: 'room_id',
         as: 'customerdetails'
       }
     }
    ]).toArray();
    response.send(customerdetail);
})

//creating room with the particular field
app.use("/room",roomRouter);
//creating booking hall with the particular field
app.use("/booking",customerRouter);




app.listen(PORT,()=>console.log("App started in",PORT));



