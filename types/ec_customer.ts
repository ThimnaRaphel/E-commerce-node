import {Model} from 'sequelize';

class EcCustomer extends Model{
    public customer_id? : number;
    public customer_name!: string;
    public e_mail!: string;
    public password!: string;
    public profile_pic!: string | null;
    public registration_id? : string;
    public supplier_invite! : string | null;
    public registration_time_stamp ?: Date;
    public createdAt?: Date;
    public updatedAt?: Date
}

export default EcCustomer;