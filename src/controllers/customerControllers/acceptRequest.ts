import  express,{Router,Response,Request}  from "express";
import Customer_Supplier_Mapping from "../../models/ec_customer_supplier_mapping";
import EcCustomers from "../../models/ec_customers";
import EcSuppliers from "../../models/ec_suppliers";

const accept = async (req: Request, res : Response)=>{
    const {registration_id,customer_id ,  status } = req.body;
    if(!registration_id){
        return res.json({message : "Please specify the corresponding supplier id"});
    }
    if(!customer_id){
        return res.status(404).json({message : "missing customer id"});
    }
    if(!status){
        return res.status(404).json({message : "status is not mentioned"});
    }
    const found = await Customer_Supplier_Mapping.findOne({where : {supplier_reg_id : registration_id,customer_reg_id : customer_id}});
    console.log('testing found',found)
    const cust_found =  await Customer_Supplier_Mapping.findOne({where : { customer_reg_id : customer_id}});
    if(found)
    {
        console.log("Found status : " + found.status);
        if(found.status!="Accepted")
        {
            if(status==="Yes" || status==="yes")
            {
                found.status="Accepted";
                await found.save(); 
                const customer_found = await EcCustomers.findOne({where : { customer_id : customer_id}});
                console.log('found the customer',customer_found)
                if(customer_found)
                {
                    customer_found.supplier_invite = found.supplier_reg_id;

                    await customer_found.save();

                    console.log('idk what is happening');
                    const found_twice = await Customer_Supplier_Mapping.findAll({where : {customer_reg_id : customer_id, status: 'pending'}});
                    console.log('found twice ',found_twice);
                    if(found_twice==null)
                    {
                        return res.json({ message: "No pending" });
                        
                    }
                    else
                    {
                        found_twice.forEach(async (customer_rejected) =>{
                            customer_rejected.status = "Rejected";
                            await customer_rejected.save();
                        });
                        return res.json({message: "updated successfully"});
                    }
                }
                else
                {
                    return res.status(404).json({message: "customer not found"});
                }
            }
            if(status==="No" || status==="no")
            {
                found.status="Rejected";
                await found.save(); // Save the changes to the database
                return res.status(200).json({ message: "Status updated successfully" });
            }
            else
            {
                return res.sendStatus(404).json({message : "The status should be either 'yes' or 'no'...."});
            }
        }
        else
        {
            return res.status(405).json({message : "The customer has already accepted an invite"});
        }
    }
    else
    {
        return res.status(405).json({message : "The customer is not invited"});
    }
    };

    export default accept;