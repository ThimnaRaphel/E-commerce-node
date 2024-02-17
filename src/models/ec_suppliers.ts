
import { DataTypes,Sequelize } from 'sequelize';
import sequelize from '../config/sequelize-config'; // Import the Sequelize instance
import EcSuppliers from '../../types/ec_supplier';
import bcrypt from 'bcrypt';

EcSuppliers.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      full_name: {
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
      profile_pic:{
        type:DataTypes.STRING,
        allowNull: true,
      },
      subscription_plan:{
        type:DataTypes.STRING,
        allowNull: false,
      },
      registration_id:{
        type:DataTypes.STRING,
        allowNull: true,
        defaultValue: ()=>{
            return Math.floor(100000 + Math.random() * 900000).toString();
        }
      },
      registration_time_stamp:{
        type:DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
 
},{
  sequelize : sequelize,
  modelName :'ec_suppliers',
  tableName : 'ec_suppliers',
  hooks : {
    beforeCreate : (user : EcSuppliers) => {
        const hashedPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        user.password = hashedPassword;
    }
}
});
 
export default EcSuppliers;