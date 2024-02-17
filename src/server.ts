import express, {Express,NextFunction,Request,Response} from 'express';
import sequelize from './config/sequelize-config.ts';
import ec_suppliers from './models/ec_suppliers.ts';
import indexRouter from '../src/routes/index.ts'
import supplierRoutes from '../src/routes/supplierRoutes.ts'
import SuperAdminRoutes from '../src/routes/superAdminRoutes.ts';
import CustomerRoutes from '../src/routes/customerRoutes.ts'
import superAdminVerifyToken from './middleware/verifysuperadmin.ts';
import {client,connectMongoDB,stopMongoDb} from '../src/services/mongodb.ts';
import bodyParser from 'body-parser';
import cors from 'cors'; //there is no output alone in the backend, need frontend also.
const app : Express = express();
const PORT = 3000;

const corsOptions = {
    origin : "http://localhost:3000",
    methods : "GET"
};

app.use(express.json());
app.use(bodyParser.json());

// app.use((req,res,next)=>middleware(req,res,next));
app.use(cors(corsOptions));
app.use('/api/v1',superAdminVerifyToken,SuperAdminRoutes);
app.use('/api/v2',supplierRoutes);
app.use('/api/v3',indexRouter);
// app.use('/api/v1/',middleware,supplierRoutes);


app.use('/api/v4',CustomerRoutes);

connectMongoDB();

sequelize.sync({force:false})
.then(()=>{
    console.log('Database Synced');
})
.catch((error : any)=>{
    console.error('Error syncing data');
});



// const middleware = (req : Request, res: Response , next : NextFunction)=>{
//     console.log("hiii cookies")
//     const api_key = req.headers['x-api-key'];
//     if(api_key=="node"){
//         next();
//     }else{
//         return res.send("invlaid api key");
//     }
// }



app.listen(PORT, () => console.log(`Listening on port ${PORT}....`));
//  export default middleware;

process.on('SIGINT', async () => {
    await stopMongoDb();
    process.exit();
});
 
process.on('exit', () => {
    stopMongoDb();
});

 