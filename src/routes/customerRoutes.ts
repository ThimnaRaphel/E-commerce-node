import  express,{Router,Response,Request}  from "express";
import importCustomerRegistration from '../controllers/authentication/registration.ts';
import importCustomerAccept from '../controllers/customerControllers/acceptRequest.ts';

const router = Router();
router.post('/CustomerRegistration', async (req : Request,res : Response)=>{
    importCustomerRegistration(req,res);
});

router.post('/AcceptPlans' , async (req: Request, res:Response)=>{
    importCustomerAccept(req,res);
})

export default router;