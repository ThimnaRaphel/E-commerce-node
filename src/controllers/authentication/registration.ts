import  express,{Router,Response,Request}  from "express";
import EcCustomers from "../../models/ec_customers.ts";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
// import middleware from "../../src/server.ts";

const registration = async( req : Request, res : Response) : Promise<Response<any,Record<string,| { message: string }| { token: string; user_type: "string"; registration_id: string }>>> =>{
    const { full_name , e_mail, password, profile_pic,user_type } = req.body;
    try{
        if (!full_name) {
            return res.status(422).json({message : "no name"});
        }
        if (!e_mail) {
            return res.status(422).json({message : "no email"});
        }
        if (!password) {
            return res.status(422).json({message : "no password"});
        }
        if (!profile_pic) {
            return res.status(422).json({message : "no profilepic"});
        }
        if(user_type==='customer' || 'Customer'){
            // await newInsert(full_name,e_mail,password,profile_pic);
            const found  = await EcCustomers.create({customer_name : full_name, e_mail : e_mail, password : password ,profile_pic : profile_pic},{raw:true});
            if(found==null){
                return res.send("error creating");
            }else{
               return res.send(`created customer ${found.dataValues.registration_id}`)
            }
            }
        else{
            return res.json({message : " user is not customer"})
        }
    }
    catch(error : any){
        console.log(error);
        return res.status(500).send(error);
    }
}

export default registration;