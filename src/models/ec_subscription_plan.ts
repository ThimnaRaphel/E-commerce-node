import { DataTypes,Sequelize } from 'sequelize';
import sequelize from '../config/sequelize-config'; // Import the Sequelize instance
import SubscriptionPlans from '../../types/ec_subscription_plan';
import bcrypt from 'bcrypt';

SubscriptionPlans.init({
    subscription_id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    subscription_plan :{
        type: DataTypes.STRING,
        allowNull:false
    },
    subscription_fee :{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    max_customers :{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    modelName :'ec_subscription_plans',
    tableName : 'ec_subscription_plans',
});

export default SubscriptionPlans;