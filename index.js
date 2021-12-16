import express, { request, response } from 'express';
import { MongoClient } from 'mongodb';
const app=express();
const PORT=9000;
const MONGO_URL="mongodb://localhost"
async function createConnection(){
  const client=await new MongoClient(MONGO_URL);
  await client.connect();
  console.log("mongodb is connected");
  return client;
}
const client=createConnection();
app.get("/",(request,response)=>{
    response.send("hello world")
});

app.get("/room",(request,response)=>{
    response.send("rooms")
});

// app.get("/room",async (request,response)=>{
//     const room=await client
//     .db("hallbooking")
//     .collection("room")
//     .find({})
//     .toArray();
// });

// app.get("/room/:id",async (response,request)=>{
//    const {id}=request.params;
//    console.log(id);
//    const roombyid=await client
//    .db("hallbooking")
//    .collection("room")
//    .findOne({id:id})
// });

// app.post("/",async (response,request)=>{
//   const data=request.body;
//   const result=await client.db("hallbooking").collection("room").insertMany(data);
//   respond.send(result);
// })



app.listen(PORT,()=>console.log("App started in",PORT));