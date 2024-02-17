import { client } from "../../services/mongodb";
import {Request,Response} from 'express';

let E_Commerce = client.db("e_commerce");
const searchProducts = async (req: Request, res: Response) => {
    try {
        const { search } = req.query;
 
        if (!search)
            return res.status(400).json({ error: "search parameter is required for searching" });
 
        const products = await E_Commerce.collection('products')
            .find({ $or: [{ product_name: { $regex: new RegExp(search as string, 'i')}}]}).toArray();
 
        res.status(200).json({products});
 
    } catch (error) {
        return res.status(404).json({error : error})
    }
};

export default searchProducts;