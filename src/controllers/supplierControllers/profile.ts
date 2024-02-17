import  express,{Router,Response,Request}  from "express";
import ec_suppliers from "../../models/ec_suppliers.ts"; 
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const profile = async (req : Request, res : Response) : Promise<Response<any,Record<string,| { message: string }| { token: string; user_type: "string"; registration_id: string }>>| undefined>=>{
    const { registration_id,user_type } = req.body;
    if(!registration_id){
        return res.status(422).send("Missing Id");
    }
    if(!user_type){
        return res.status(422).send("Missing user type");
    }
    if(user_type==='supplier' || user_type==='Supplier'){
    const user = await ec_suppliers.findOne({ where: { registration_id }, raw: true });
    if(user){
        return res.status(200).json(`Account found with email ${user.e_mail} and name ${user.full_name}`);
    }
    else
    {
        console.log("supplier not found");
    }
    }
    if(user_type==='customer' || user_type==='Customer'){
        const user = await ec_suppliers.findOne({ where: { registration_id }, raw: true });
        if(user){
            return res.status(200).json(`Account found with email ${user.e_mail},name ${user.full_name},registration id ${user.registration_id}`);
        }
        else
        {
            console.log("customer not found");
        }
        }
    else{
        return res.json({message:'not customer or supplier'});
    }
}

export default profile;