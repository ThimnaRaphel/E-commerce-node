import "dotenv/config";
 
const MONGO_URI = process.env.MONGO_URI || "";
 
 export default MONGO_URI;