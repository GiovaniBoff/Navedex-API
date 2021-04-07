import NaverService from '../../src/service/NaverService';
import User from '../../src/models/User';
/*eslint-disable */
describe('NaverService unit test', () => {


  it('Should create a naver and return item created', async () => {
    const user = await User.create({
      name: 'User test',
      email: 'usertest@mail.com',
      password: '1234'
    });
      
      const naver = {
          name: 'Test',
          birthdate: '1998-08-19',
          admission_date: '2020-01-12',
          job_role: 'test'
      };
      
      const response = await NaverService.store(naver, user.id);
      
      expect(response).not.toBeNull();
  });
    
});
