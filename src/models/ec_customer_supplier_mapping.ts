import { DataTypes,Sequelize } from 'sequelize';
import sequelize from '../config/sequelize-config';
import Customer_Supplier_Mapping from '../../types/ec_customer_supplier_mapping';

Customer_Supplier_Mapping.init({
    customer_supplier_id :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    supplier_reg_id:{
        type:DataTypes.STRING,
        allowNull : false
    },
    customer_reg_id :{
        type: DataTypes.INTEGER,
        allowNull : false
    },
    status : {
        type:DataTypes.STRING,
        allowNull : false
    }
},{
    sequelize,
    modelName :'ec_customer_supplier_mapping',
    tableName : 'ec_customer_supplier_mapping',
});

export default Customer_Supplier_Mapping;