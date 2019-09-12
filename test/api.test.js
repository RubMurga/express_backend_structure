const app = require('../server') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

it('Test the root endpoint', async done => {
    // Sends GET Request to /api endpoint and checks the status and the response content!
    const res = await request.get('/api')
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('this is a message')
    done()
  })

