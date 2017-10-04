const request = require('supertest');
const app = require('../index');

//=========================
// Create/manage users
//=========================

let createdUserId;

describe('POST /api/auth/register', () => {
  test('Should receive object with token and user object', () => {
    return request(app)
      .post('/api/auth/register')
      .expect(201)
      .send({
        email: 'test@test.test',
        password: 'testytesttest'
      })
      // .set({"Authorization": "Basic YW5uZTphbm5l"})
      .then(res => {
        expect(res.body).toHaveProperty('token');
        expect(res.body.token).toContain('JWT');
        expect(res.body).toHaveProperty('user');
        expect(res.body.user).toHaveProperty('_id');
        expect(res.body.user).toHaveProperty('email');
        expect(res.body.user).toHaveProperty('name');
        createdUserId = res.body.user._id;
      })
  })
})

describe('POST /api/auth/login', () => {
  test('Should receive object with token and user object', () => {
    return request(app)
      .post('/api/auth/login')
      .expect(200)
      .send({
        email: 'test@test.test',
        password: 'testytesttest'
      })
      // .set({"Authorization": "Basic YW5uZTphbm5l"})
      .then(res => {
        expect(res.body).toHaveProperty('token');
        expect(res.body.token).toContain('JWT');
        expect(res.body).toHaveProperty('user');
        expect(res.body.user).toHaveProperty('_id');
        expect(res.body.user).toHaveProperty('email');
        expect(res.body.user).toHaveProperty('name');
      })
  })
})

describe('DELETE /api/auth/user/:id', () => {
  test('Should delete recently created user', () => {
    return request(app)
      .delete(`/api/auth/user/${createdUserId}`)
      .expect(200)
      // .send({
      //   email: 'test@test.test',
      //   password: 'testytesttest'
      // })
      .then(res => {
        expect(res.body).toHaveProperty('status')
        expect(res.body.status).toBe('success')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toBe('User successfully deleted')
      })
  })
})

//=========================
// Create/manage snippets
//=========================
