import  express,{Router,Response,Request}  from "express";
import ec_suppliers from "../../models/ec_suppliers.ts"; 
import SubscriptionPlans from "../../models/ec_subscription_plan";
import superAdminVerifyToken from "../../middleware/verifysuperadmin.ts";

const plans = async (req : Request,res : Response)=>{
    const {subscription_plan,subscription_fee,max_customers } = req.body;
    if(!subscription_plan){
        return res.status(422).send("Missing plan");
    }
    if(!subscription_fee){
        return res.status(422).send("Missing fee");
    }
    if(!max_customers){
        return res.status(422).send("Missing no. of customers");
    }
    const Subscription = await SubscriptionPlans.create({subscription_plan : subscription_plan, subscription_fee : subscription_fee, max_customers : max_customers},{raw:true});
    return res.status(200).json(`${Subscription.subscription_plan} plan created by super Admin`);
    };
export default plans;