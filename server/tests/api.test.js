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
        expect(res.body.data).toHaveProperty('n')
        expect(res.body.data.n).toBe(1)
        expect(res.body.data).toHaveProperty('ok')
        expect(res.body.data.ok).toBe(1)
      })
  })
})

//=========================
// Create/manage snippets
//=========================

let snippetId;

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
        expect(res.body.data).toHaveProperty('snippet')
        expect(res.body.data.snippet).toHaveProperty('userId')
        expect(res.body.data.snippet.userId).toBe('59d4edeb4e0288f57323e904')
        expect(res.body.data.snippet).toHaveProperty('title')
        expect(res.body.data.snippet.title).toBe('Title')
        expect(res.body.data.snippet).toHaveProperty('code')
        expect(res.body.data.snippet.code).toBe('Code')
        expect(res.body.data.snippet).toHaveProperty('notes')
        expect(res.body.data.snippet.notes).toBe('Notes')
        expect(res.body.data.snippet).toHaveProperty('language')
        expect(res.body.data.snippet.language).toBe('Language')
        expect(res.body.data.snippet).toHaveProperty('tags')
        expect(res.body.data.snippet.tags).toEqual(['Tag1', 'Tag2', 'Tag3'])
        expect(res.body.data.snippet).toHaveProperty('_id')
        expect(res.body.data.snippet._id).toBeTruthy()
        expect(res.body.data.snippet).toHaveProperty('__v')
        expect(res.body.data.snippet.__v).toBeGreaterThanOrEqual(0)
        snippetId = res.body.data.snippet._id;
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

describe('PUT /api/auth/snippet/:snippetId', () => {
  test('Should update snippet with :snippetId', () => {
    return request(app)
      .put(`/api/auth/snippet/${snippetId}`)
      .expect(200)
      .send({
        title: 'Updated title',
        code: 'Updated code',
        notes: 'Updated notes',
        language: 'Updated language',
        tags: 'New-tag1, New-tag2, New-tag3'
      })
      .then(res => {
        expect(res.body).toHaveProperty('status')
        expect(res.body.status).toBe('success')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveProperty('n')
        expect(res.body.data.n).toBe(1)
        expect(res.body.data).toHaveProperty('nModified')
        expect(res.body.data.nModified).toBe(1)
        expect(res.body.data).toHaveProperty('ok')
        expect(res.body.data.ok).toBe(1)
      })
  })
})

describe('DELETE /api/auth/snippet/:snippetId', () => {
  test('Should delete snippet with :snippetId', () => {
    return request(app)
      .delete(`/api/auth/snippet/${snippetId}`)
      .expect(200)
      .then(res => {
        expect(res.body).toHaveProperty('status')
        expect(res.body.status).toBe('success')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveProperty('n')
        expect(res.body.data.n).toBe(1)
        expect(res.body.data).toHaveProperty('ok')
        expect(res.body.data.ok).toBe(1)
      })
  })
})
