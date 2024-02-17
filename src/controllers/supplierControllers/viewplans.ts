import  express,{Router,Response,Request}  from "express";
import SubscriptionPlans from "../../models/ec_subscription_plan";

const getPlans = async(req:Request,res:Response)=>{
    try {
        const subscriptionPlans = await SubscriptionPlans.findAll();
        return res.json(subscriptionPlans);
    } catch (error) {
        console.error("Error fetching subscription plans:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export default getPlans;