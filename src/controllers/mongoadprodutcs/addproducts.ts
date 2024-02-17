
import { client } from "../../services/mongodb";
import {Request,Response} from 'express';

let E_Commerce = client.db("e_commerce");

const addProducts = async (req:Request,res:Response)=>{
    try{
        const products : Array<{product_name : string,product_category : string,product_price : number,product_stock : number,[key : string]: string|number}>= req.body;
        // const file =req?.file as Express.Multer.File;
        for (let product of products){
            if(!product.product_name){
                return res.json({message : "no name"});
            }
            if(!product.product_category){
                return res.json({message : "no category"});
            }
            if(!product.product_price){
                return res.json({message : "no price"});
            }
            if(!product.product_stock){
                return res.json({message : "no stock"});
            }
            else{
                E_Commerce.collection("products").insertMany(products);
                return res.json({message : "Products added successfully"});
            }
        }
    }
catch(err){
    console.log("mongoDb error",err);
}
};

export default addProducts;