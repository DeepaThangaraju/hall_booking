import { client } from './index.js';

async function editById(id, data) {
  return await client.db("hallbooking").collection("room").updateOne({ id: id }, { $set: data });
}
async function createRoom(data) {
  return await client.db("hallbooking").collection("room").insertMany(data);
}
async function getRoomByQuery(filter) {
  return await client
    .db("hallbooking")
    .collection("room")
    .find(filter)
    .toArray();
}
async function deleteRoomById(id) {
  return await client
    .db("hallbooking")
    .collection("room")
    .deleteOne({ id: id });
}
async function getRoomById(id) {
  return await client
    .db("hallbooking")
    .collection("room")
    .findOne({ id: id });
}
export {getRoomById, deleteRoomById, getRoomByQuery, createRoom, editById}