import { client } from "../../services/mongodb";
import {Request,Response} from 'express';

let E_Commerce = client.db("e_commerce");
const filterProducts = async (req : Request, res : Response) => {
    try
    {
        const {filter} = req.query;
 
        if(!filter)
            return res.status(400).json({error : "Filter Parameter is Required for Filtering"});
 
            const products = await E_Commerce.collection('products').findOne({ product_category: filter as string });
 
        res.status(200).json({products});
    } catch(error) {
        return res.status(404).json({error : error});
    }
}
 
export default filterProducts;
 
 
//change the document name as per ur dbs