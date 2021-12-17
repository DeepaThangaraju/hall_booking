import express from 'express';
import { getRoomById, deleteRoomById, getRoomByQuery, createRoom, editById } from '../roommethod.js';
const router=express.Router();
//getting room by id
router.route("/:id").get(async (request,response)=>{
    const {id}=request.params;
    console.log(id);
    const room=await getRoomById(id);
    
    room?
    response.send(room)
    :response.status(404).send({message:"Room not found"})
 })
 //delete room by id
 .delete(async (request,response)=>{
   const {id}=request.params;
   console.log(id);
   const room=await deleteRoomById(id);
   
   room.deletedCount>0?
   response.send(room)
   :response.status(404).send({message:"Room not found"})
 })
 //edit room by id
 .put(async (request,response)=>{
    const {id}=request.params;
    const data=request.body;
    console.log(id);
    const result=await editById(id, data);
    const editedlist=await getRoomById(id);
    response.send(editedlist);
  });
 //get room by query 
 router.route("/").get(async (request,response)=>{
   const filter=request.query;
   console.log(filter)
   if(filter.Room_no){
     filter.Room_no=parseInt(filter.Room_no);
   }
   if(filter.Rate){
     filter.Rate=parseInt(filter.Rate);
   }
   
     const rooms=await getRoomByQuery(filter);
     response.send(rooms);
 })
 //create room by post method
 .post(async (request,response)=>{
   const data=request.body;
   console.log(data);
   const result=await createRoom(data);
   response.send(result);
 })
 


 export const roomRouter =router;
 