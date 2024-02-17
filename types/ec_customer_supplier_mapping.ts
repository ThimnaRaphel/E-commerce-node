import {Model} from 'sequelize';

class customer_supplier_mapping extends Model {
    public c_s_id?:number
    public supplier_reg_id!:string
    public customer_reg_id!:number
    public status!: string
}

export default customer_supplier_mapping;