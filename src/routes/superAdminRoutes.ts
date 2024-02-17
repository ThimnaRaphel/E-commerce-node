import express, {Router, Request, Response} from 'express';
import AddPlans from '../controllers/superAdminControllers/addplans';

const router = Router();
router.post('/AddPlans',async(req : Request,res : Response)=>{
    AddPlans(req,res);
 });

export default router;