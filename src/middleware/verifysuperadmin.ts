import express, {Express,NextFunction,Request,Response} from 'express';
import jwt from "jsonwebtoken";

const superAdminVerifyToken = (req : Request, res : Response, next : NextFunction): void|Response => {

    const bearerToken = req.headers.authorization;

    let token;
    token = bearerToken?.split("Bearer ")[1];
    if(!bearerToken)
    {
        return res.status(401).json({error : 'Token Not Provided!'});
    }
 

    if (!token) {
        return res.status(401).json({error : 'Token is not provided'});
    }


    jwt.verify(token as string, 'my-secret-key', (err,decoded)=>{
        if(err) {
            return res.status(401).json({error : 'Failed to authenticate token'});
        }
        req.body.jwt_decoded = decoded;
        console.log(decoded);
        if(req.body.jwt_decoded.user_type === 'Super Admin' || req.body.jwt_decoded.user_type === 'Super admin')
            next();
        else
        return res.status(401).json({error : 'Not a Super User!'});
    });
}

export default superAdminVerifyToken;
