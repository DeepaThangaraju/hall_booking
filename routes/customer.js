import express from 'express';
const router=express.Router();
import { customerByQuery, getCustomerById, editById, deleteById, createCustomer } from '../customermethod.js';
//getting customer by query
router.route("/").get(async (request,response)=>{
    const filter=request.query;
    console.log(filter);
    const cus=await customerByQuery(filter);
    response.send(cus );
  })
  //post data in db
.post(async (request,response)=>{
    const data=request.body;
    const customer=await createCustomer(data);
    response.send(customer);
  })
  //getting customer by id
  router.route("/:id").get(async (request,response)=>{
    const {id}=request.params;
    console.log(id);
    const customer=await getCustomerById(id)
    customer?
    response.send(customer)
    :response.status(404).send({message:"Customer not found"})
  })
  //edit customer by id
  .put(async (request,response)=>{
    const {id}=request.params;
    const data=request.body;
    console.log(data);
    console.log(id);
    const customer=await editById(id, data)
    const editedcustomer=await getCustomerById(id);
    response.send(editedcustomer);
  })
  //delete customer by id
  .delete(async (request,response)=>{
    const {id}=request.params;
    console.log(id);
    const customer=await deleteById(id)
    customer.deletedCount>0?
    response.send(customer)
    :response.status(404).send({message:"Customer not found"})
  })
  
 

  export const customerRouter=router;