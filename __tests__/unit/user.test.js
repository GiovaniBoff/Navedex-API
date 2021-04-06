import bcrypt from 'bcryptjs';
import sequelize from 'sequelize';
import User from '../../src/models/User';

describe("User unit", () => {
    beforeEach(async () => {
        await User.sync({ force: true });
    })

    it("should encrypt user password", async () => {

        const user = await User.create({
            name: "TestUser",
            email: "mail@mail.com",
            password: "123"
        });

        const compareHash = await bcrypt.compare("123", user.password_hash);

        expect(compareHash).toBe(true);
    });
});