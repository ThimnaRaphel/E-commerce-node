import  express,{Router,Response,Request}  from "express";
import EcSuppliers from "../../models/ec_suppliers.ts"; 
import EcCustomers from "../../models/ec_customers.ts";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const login = async (req : Request , res : Response) : Promise<Response<any,Record<string,| { message: string }| { token: string; user_type: "string"; registration_id: string}>>>=>{
    const { e_mail, password , user_type} = req.body;
    if (!e_mail) {
        return res.status(422).json({message : "no email"});
    }
    if (!password) {
        return res.status(422).json({message : "no password"});
    }
    if(!user_type) {
        return res.status(422).json({message : "no usertype"});
    }
    if(user_type==='supplier' || user_type==='Supplier' || user_type==='Super Admin' || user_type==='Super admin'){
    const user = await EcSuppliers.findOne({ where: { e_mail }, raw: true });
    try{
        if(user && bcrypt.compareSync(password,user.password)){
            const token = jwt.sign({
                registration_id: user?.registration_id,
                user_type
            },"my-secret-key",{
                expiresIn: "24h",
            })
      return res.status(200).json({ message: "Login successful", token: token });
    }
    else {
        return res.status(401).json({ error: "Invalid username or password" });
    }
    }
    catch (error : any) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
    if(user_type==='customer' || user_type==='Customer'){
    const user = await EcCustomers.findOne({ where: { e_mail }, raw: true });
    try{
        if(user && bcrypt.compareSync(password,user.password)){
            const token = jwt.sign({
                registration_id: user?.registration_id,
                user_type
            },"my-secret-key",{
                expiresIn: "24h",
            })
      return res.status(200).json({ message: "Login successful", token: token });
    }
    else {
        return res.status(401).json({ error: "Invalid username or password" });
    }
    }
    catch (error : any) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
    else{
        return res.json({message : "not supplier or customer"});
    }
}

export default login;