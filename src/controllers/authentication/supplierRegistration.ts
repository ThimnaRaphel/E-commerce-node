import  express,{Router,Response,Request}  from "express";
import EcSuppliers from "../../models/ec_suppliers.ts"; 
import SubscriptionPlans from "../../models/ec_subscription_plan.ts";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
// import middleware from "../../src/server.ts";

const registration = async( req : Request, res : Response) : Promise<Response<any,Record<string,| { message: string }| { token: string; user_type: "string"; registration_id: string }>>> =>{
    const { full_name , e_mail, password, profile_pic,user_type,subscription_plan } = req.body;
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
        if (!subscription_plan) {
            return res.status(422).json({message : "no plan"});
        }
        if(user_type==='Super admin' || user_type==='Super Admin'){
            const found  = await EcSuppliers.create({full_name : full_name, e_mail : e_mail, password : password ,profile_pic : profile_pic,subscription_plan : subscription_plan , registration_id : 1},{raw:true});
            if(found==null){
                return res.status(404).send("error creating");
            }else{
            return res.status(200).send(`created supplier ${found.dataValues.registration_id}`)
            }
        }
       if(user_type==='supplier' || user_type==='Supplier'){
        const subscription_found = await SubscriptionPlans.findOne({where : {subscription_plan : subscription_plan}});
        console.log(subscription_found);
        if(subscription_found){
        const found  = await EcSuppliers.create({full_name : full_name, e_mail : e_mail, password : password ,profile_pic : profile_pic,subscription_plan : subscription_plan},{raw:true});
            if(found==null){
                return res.status(404).send("error creating");
            }else{
            return res.status(200).send(`created supplier with registration id ${found.dataValues.registration_id}`)
            }
        }
        else{
            return res.status(404).json({message : "No such subscription plan available"});
        }
        }
        else{
            return res.status(404).json({message : " user is not supplier"})
        }
    }
    catch(error : any){
        console.log(error);
        return res.status(500).send(error);
    }
}

export default registration;