
import { DataTypes,Sequelize } from 'sequelize';
import sequelize from '../config/sequelize-config'; // Import the Sequelize instance
import EcCustomers from '../../types/ec_customer';
import bcrypt from 'bcrypt';

EcCustomers.init({
      customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      e_mail:{
        type:DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      registration_id:{
        type:DataTypes.STRING,
        allowNull: true,
        defaultValue: ()=>{
            return Math.floor(100000 + Math.random() * 900000).toString();
        }
      },
      supplier_invite : {
        type: DataTypes.STRING,
        allowNull:true
      },
      registration_time_stamp:{
        type:DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
 
},{
  sequelize : sequelize,
  modelName :'ec_customers',
  tableName : 'ec_customers',
  hooks : {
    beforeCreate : (user : EcCustomers) => {
        const hashedPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        user.password = hashedPassword;
    }
}
});
 
export default EcCustomers;