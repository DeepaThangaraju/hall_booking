import { client } from './index.js';
//query to edit room by id
async function editById(id, data) {
  return await client.db("hallbooking").collection("room").updateOne({ id: id }, { $set: data });
}
//query to create room in mongodb
async function createRoom(data) {
  return await client.db("hallbooking").collection("room").insertMany(data);
}
//query to get room by query param in mongodb
async function getRoomByQuery(filter) {
  return await client
    .db("hallbooking")
    .collection("room")
    .find(filter)
    .toArray();
}
//query to delete roomby id in mongodb
async function deleteRoomById(id) {
  return await client
    .db("hallbooking")
    .collection("room")
    .deleteOne({ id: id });
}
//query to get room by id in mongodb
async function getRoomById(id) {
  return await client
    .db("hallbooking")
    .collection("room")
    .findOne({ id: id });
}
export {getRoomById, deleteRoomById, getRoomByQuery, createRoom, editById}