
import  express,{Router,Response,Request}  from "express";
import EcSuppliers from "../models/ec_suppliers.ts"; 
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import importlogin from '../controllers/authentication/login.ts';


const router = Router();

router.post('/Login',async (req : Request,res : Response)=>{
    importlogin(req,res);
});

export default router;
// const newInsert = async (full_name: string,e_mail : string ,password : string,profile_pic : string) => {
//     const createResult = EcSuppliers.create({full_name : `${full_name}, e_mail :${e_mail}, password : ${password} ,profile_pic : ${profile_pic}`},{raw:true});
 
//     console.log("Hiii" + createResult);
//     console.log("Insertion Completed");
//   };

