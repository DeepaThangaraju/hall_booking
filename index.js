import express, { query, request, response } from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import {roomRouter} from "./routes/room.js";

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

app.use("/room",roomRouter)




app.listen(PORT,()=>console.log("App started in",PORT));


