import { INestApplication } from '@nestjs/common'
import { IAccess } from 'domains/core/access/access.types'
import {
  createAccessFixture,
  oneAccessFixture,
  updateAccessFixture,
} from 'domains/core/access/tests/access.fixtures'
import { buildAppModule, buildRequester } from 'shared/tests/helpers/app.builder'

describe('Access - /access (e2e)', () => {
  const access: IAccess = oneAccessFixture
  const createAccess = createAccessFixture
  const updateAccess = updateAccessFixture

  let app: INestApplication
  let id: number
  let agent

  beforeAll(async () => {
    app = await buildAppModule()
    agent = buildRequester(app)
  })

  it('Create [POST /accesses]', async () => {
    return agent
      .post('/accesses')
      .send(createAccess)
      .expect(201)
      .then(({ body }) => {
        id = body.id
        expect(body).toEqual({ ...access, id: body.id })
      })
  })

  it('Get access [GET /accesses]', () => {
    return agent
      .get(`/accesses/${id}`)
      .set('Authorization', `Bearer ${process.env.ACCESS_TOKEN}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Updates access [PATCH /accesses/:id]', () => {
    return agent
      .patch(`/accesses/${id}`)
      .set('Authorization', `Bearer ${process.env.ACCESS_TOKEN}`)
      .send({ ...updateAccess })
      .expect(200)
  })

  it('Deletes access [DELETE /accesses/:id]', () => {
    return agent.delete(`/accesses/${id}`).expect(204)
  })

  afterAll(async () => {
    await app.close()
  })
})
