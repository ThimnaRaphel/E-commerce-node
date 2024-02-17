
import  express,{Router,Response,Request}  from "express";
import ec_suppliers from "../../models/ec_suppliers.ts"; 
import ec_customers from '../../models/ec_customers.ts';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const reset = async (req : Request, res : Response) : Promise<Response<any,Record<string,| { message: string }| { token: string; user_type: "string"; registration_id: string }>>>=>{
    const { e_mail,user_type, new_password } = req.body;
    if(!e_mail)
        return res.status(422).json({message : "Email Field is Empty!"});
    if(!user_type)
        return res.status(422).send("Type of User is not Defined!");
    if(!new_password){
        return res.status(422).send("New Password Field is Empty");
    }
    const hashedPassword = bcrypt.hashSync(new_password, bcrypt.genSaltSync(10));
    if(user_type==='supplier'){
    const result = await ec_suppliers.update({ password : hashedPassword },{where : {e_mail : e_mail}});
    if(result != null){
        return res.status(200).send("Password has been Successfully changed!");
    }
    else{
        return res.status(404).send("Invalid Email!");
    }
    }
    if(user_type==='customer'){
        const result = await ec_customers.update({ password : hashedPassword },{where : {e_mail : e_mail}});
        if(result != null){
            return res.status(200).send("Password has been Successfully changed!");
        }
        else{
            return res.status(404).send("Invalid Email!");
        }
    }
    else{
        return res.json({message : "not customer or supplier"});
    }

}
export default reset;