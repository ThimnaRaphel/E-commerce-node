import { Sequelize } from "sequelize";
import Customer_Supplier_Mapping from "../../models/ec_customer_supplier_mapping";
import  express,{Router,Response,Request}  from "express";
import EcCustomers from "../../models/ec_customers";
import EcSuppliers from "../../models/ec_suppliers";
import SubscriptionPlans from "../../models/ec_subscription_plan";

const invite = async(req:Request,res:Response)=>{
    const { registration_id,customer_id } = req.body;
    if(!registration_id){
        return res.status(404).json({message : "registration id missing"});
    }
    if(!customer_id){
        return res.status(404).json({message : "customer id missing"});
    }
    else{
    const duplicate = await Customer_Supplier_Mapping.findOne({where :{supplier_reg_id: registration_id , customer_reg_id : customer_id}});
    if(duplicate){
        return res.json({error : "Already the customer has been invited by the same supplier."})
    }
    else{
        const supplier_count = await Customer_Supplier_Mapping.findAll({ where : {supplier_reg_id : registration_id}});
        const supplier_count_len = supplier_count.length;
        const supplierFound = await EcSuppliers.findOne({where : {registration_id : registration_id }});
        if(supplierFound){
            const supplier_plan_found = supplierFound.subscription_plan;
        const plan_found = await SubscriptionPlans.findOne({where : {subscription_plan : supplier_plan_found}});
        let max_of_customers = await plan_found?.max_customers;
        if(max_of_customers===undefined){
            max_of_customers=0;
            console.log("No subscription plan for supplier")
        }
        if(supplier_count_len<max_of_customers){
            const customerFound = await EcCustomers.findOne({where : {customer_id : customer_id}});
            if(supplierFound && customerFound){
                if(customerFound.supplier_invite === null){
                    await Customer_Supplier_Mapping.create({supplier_reg_id : registration_id , customer_reg_id : customer_id , status : "pending"});
                    return res.status(200).json({message : "invitation send"});
                }
                else{
                    return res.status(422).json({message : "The customer already accepted the request by another supplier"});
                }
            }
            else{
                return res.status(404).json({message : 'make sure the credentials are correct'});
            }
        }
        else{
            return res.status(406).json({alert : 'already reached the maximum number of customers'});
        }
    }
    else{
        return res.json({ error : "No such supplier found..Check the registration id"});
    }
}
}
};
export default invite;