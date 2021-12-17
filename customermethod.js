import { client } from './index.js';
//post data into the mongodb
async function createCustomer(data) {
  return await client
    .db("hallbooking")
    .collection("booking")
    .insertMany(data);
}
//query to delete customer from mongodb by id
async function deleteById(id) {
  return await client
    .db("hallbooking")
    .collection("booking")
    .deleteOne({ id: id });
}
//query to edit customer from mongodb by id
async function editById(id, data) {
  return await client
    .db("hallbooking")
    .collection("booking")
    .updateOne({ id: id }, { $set: data });
}
//query to retrive customer from mongodb by id
async function getCustomerById(id) {
  return await client
    .db("hallbooking")
    .collection("booking")
    .findOne({ id: id });
}
//query to retrive customer from mongodb by query params
async function customerByQuery(filter) {
  return await client
    .db("hallbooking")
    .collection("booking")
    .find(filter)
    .toArray();
}

export { customerByQuery, getCustomerById, editById, deleteById, createCustomer }
