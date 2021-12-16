import express, { query, request, response } from 'express';
import { MongoClient } from 'mongodb';
const app=express();
const PORT=9000;
app.use(express.json());
const MONGO_URL="mongodb://localhost"
async function createConnection(){
  const client= new MongoClient(MONGO_URL);
  await client.connect();
  console.log("mongodb is connected");
  return client;
}
const client=await createConnection();
app.get("/",(request,response)=>{
    response.send("hello world")
});



app.get("/room/:id",async (request,response)=>{
   const {id}=request.params;
   console.log(id);
   const room=await client
   .db("hallbooking")
   .collection("room")
   .findOne({id:id});
   
   room?
   response.send(room)
   :response.status(404).send({message:"Room not found"})
});
app.delete("/room/:id",async (request,response)=>{
  const {id}=request.params;
  console.log(id);
  const room=await client
  .db("hallbooking")
  .collection("room")
  .deleteOne({id:id});
  
  room.deletedCount>0?
  response.send(room)
  :response.status(404).send({message:"Room not found"})
});

app.get("/room",async (request,response)=>{
  const filter=request.query;
  console.log(filter)
  if(filter.Room_no){
    filter.Room_no=parseInt(filter.Room_no);
  }
  if(filter.Rate){
    filter.Rate=parseInt(filter.Rate);
  }
  
    const rooms=await client
    .db("hallbooking")
    .collection("room")
    .find(filter)
    .toArray();
    response.send(rooms);
});

app.post("/",async (request,response)=>{
  const data=request.body;
  console.log(data);
  const result=await client.db("hallbooking").collection("room").insertMany(data);
  response.send(result);
})

app.put("/room/:id",async (request,response)=>{
  const {id}=request.params;
  const data=request.body;
  console.log(id);
  const result=await client.db("hallbooking").collection("room").updateOne({id:id},{$set:data});
  response.send(result);
})



app.listen(PORT,()=>console.log("App started in",PORT));