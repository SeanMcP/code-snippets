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

describe('POST /api/auth/snippet', () => {
  test('Should create a snippet for example user', () => {
    return request(app)
      .post('/api/auth/snippet')
      .expect(200)
      .send({
        userId: '59d4edeb4e0288f57323e904',
        title: 'Title',
        code: 'Code',
        notes: 'Notes',
        language: 'Language',
        tags: 'Tag1, Tag2, Tag3'
      })
      .then(res => {
        expect(res.body).toHaveProperty('status')
        expect(res.body.status).toBe('success')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveProperty('user')
        expect(res.body.data.user).toHaveProperty('userId')
        expect(res.body.data.user.userId).toBe('59d4edeb4e0288f57323e904')
        expect(res.body.data.user).toHaveProperty('title')
        expect(res.body.data.user.title).toBe('Title')
        expect(res.body.data.user).toHaveProperty('code')
        expect(res.body.data.user.code).toBe('Code')
        expect(res.body.data.user).toHaveProperty('notes')
        expect(res.body.data.user.notes).toBe('Notes')
        expect(res.body.data.user).toHaveProperty('language')
        expect(res.body.data.user.language).toBe('Language')
        expect(res.body.data.user).toHaveProperty('tags')
        expect(res.body.data.user.tags).toEqual(['Tag1', 'Tag2', 'Tag3'])
      })
  })
})

describe('GET /api/auth/snippet', () => {
  test('Should find all snippets', () => {
    return request(app)
      .get('/api/auth/snippet')
      .expect(200)
      .then(res => {
        expect(res.body).toHaveProperty('status')
        expect(res.body.status).toBe('success')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toBeTruthy()
      })
  })
})
