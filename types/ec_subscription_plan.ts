import {Model} from "sequelize";

class SubscriptionPlans extends Model {
    public subscription_id? : number;
    public subscription_plan! : string;
    public subscription_fee!: number;
    public max_customers!: number;
}

export default SubscriptionPlans;
