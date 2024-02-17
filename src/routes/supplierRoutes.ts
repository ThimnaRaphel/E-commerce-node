
import ec_suppliers from "../../types/ec_supplier";
import express, {Router, Request, Response} from 'express';
import bcrypt from 'bcrypt';
import importReset from '../controllers/authentication/resetPassword';
import importProfile from '../controllers/supplierControllers/profile';
import importSupplierRegistration from '../controllers/authentication/supplierRegistration.ts';
import importInvite from '../controllers/supplierControllers/sendinvite.ts';
import ImportViewPlans from '../controllers/supplierControllers/viewplans.ts';
import ImportAddProducts from '../controllers/mongoadprodutcs/addproducts.ts';
import ImportViewProducts from '../controllers/mongoadprodutcs/viewproducts.ts';
import ImportSearchProducts from '../controllers/mongoadprodutcs/serachProducts.ts';
import ImportFilterProducts from '../controllers/mongoadprodutcs/filterproducts.ts';

const router = Router();
router.get('/Profile',async (req : Request,res : Response)=>{
   importProfile(req,res);
});

router.patch('/Reset', async (req : Request,res : Response)=>{
    importReset(req,res);
});

router.post('/SupplierRegistration', async (req : Request,res : Response)=>{
    importSupplierRegistration(req,res);
});
router.post('/SendInvite', async (req : Request,res : Response)=>{
    importInvite(req,res);
});

router.get('/ViewPlans', async (req : Request,res : Response)=>{
    ImportViewPlans(req,res);
});

router.post('/MongoAddProducts' , async (req: Request,res: Response)=>{
    ImportAddProducts(req,res);
});

router.get('/MongoViewProducts', async (req: Request, res:Response)=>{
    ImportViewProducts(req,res);
});
router.get('/MongoSearchProducts', async(req:Request,res:Response)=>{
    ImportSearchProducts(req,res);
});
router.get('/MongoFilterProducts', async(req:Request,res:Response)=>{
    ImportFilterProducts(req,res);
});
export default router;