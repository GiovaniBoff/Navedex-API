import Sequelize,{Model} from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model{
    static init(sequelize){
        super.init(
            {

            },
            {
                sequelize
            }
        );

        this.addHook('beforeSave', async(user)=>{
            if(user.password){
                user.passwordHash = await bcrypt.hash(user.password,8);
            }
        });

        return this;
    };
}