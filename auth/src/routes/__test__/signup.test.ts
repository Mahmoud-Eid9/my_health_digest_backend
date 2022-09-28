import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'maahmouded948@test.com',
      password: 'password',
      name: 'hello',
      gender: 'male',
      age: 33,
      company: 'microsoft',
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'maahmouded948test.com',
      password: 'password',
      name: 'hello',
      gender: 'male',
      age: 33,
      company: 'microsoft',
    })
    .expect(400);

    await request(app)
    .post('/api/users/signup')
    .send({
      email: 'maahmouded948@test.com',
      password: 'ps',
      name: 'hello',
      gender: 'male',
      age: 33,
      company: 'microsoft',
    })
    .expect(400);
});

it('disallows duplicate emails', async () => {
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
  .expect(201);

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
  .expect(400)
})
