import request from 'supertest';
import { app } from '../../app';

it('fails when email does not exist', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'password',
    name: 'hello',
    gender: 'male',
    age: 33,
    company: 'microsoft',
  })
  .expect(201)

  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'sgesfe'
  })
  .expect(400)
})
