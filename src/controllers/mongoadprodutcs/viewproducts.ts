
import { client } from "../../services/mongodb";
import {Request,Response} from 'express';

const E_Commerce = client.db("e_commerce");
const collection = E_Commerce.collection("products");

const offset = '3';
const limit = '5';
const sortBy = 'product_stock';
const sortOrder = '1';

const viewProducts = async(req: Request,res: Response)=>{
    const { offset, limit,sortBy,sortOrder} = req.query;
    try{
        const products = await collection.find().skip(parseInt(offset as string)).limit(parseInt(limit as string)).sort({[sortBy as string] : parseInt(sortOrder as string) ? 1: -1}).toArray();
        return res.status(200).json({products});
    }
    catch(error) {
        return res.status(404).json({error : error})
    }
};

export default viewProducts;