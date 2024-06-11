const request = require('supertest');
const app = require('../../app');
const {db, client} = require('../../services/database');

describe('Get Logs', () => {
  beforeEach(async () => {
    await db.collection('logs').deleteMany({});
  });

  afterAll(async () => {
    client.close();
  });

  it('should get all users in array', async () => {
    const expected = {'foo': 'bar'};
    await db.collection('logs').insertOne(expected);
    delete expected._id;

    const res = await request(app).get('/logs');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0]).toEqual(expect.objectContaining(expected));
  });
});
