import sequelize from '../../src/database/index';

export default async () => {

    return await (
        sequelize.models.map(key => {
            return sequelize.models[key].destroy({ truncate: true, force: true });
        })
    )

}