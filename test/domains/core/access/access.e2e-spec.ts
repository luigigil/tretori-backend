import { INestApplication } from '@nestjs/common'
import { IAccess } from '../../../../src/domains/core/access/access.types'
import {
  createAccessFixture,
  oneAccessFixture,
  updateAccessFixture,
} from '../../../../src/domains/core/access/tests/access.fixtures'
import { buildAppModule, buildRequester } from '../../../helpers/app.builder'

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

  it('Create [POST /access]', async () => {
    return agent
      .post('/access')
      .send(createAccess)
      .expect(201)
      .then(({ body }) => {
        id = body.id
        expect(body).toEqual({ ...access, id: body.id })
      })
  })

  it('Get access [GET /access]', () => {
    return agent
      .get(`/access/${id}`)
      .set('Authorization', `Bearer ${process.env.ACCESS_TOKEN}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Updates access [PATCH /access/:id]', () => {
    return agent
      .patch(`/access/${id}`)
      .set('Authorization', `Bearer ${process.env.ACCESS_TOKEN}`)
      .send({ ...updateAccess })
      .expect(200)
  })

  it('Deletes access [DELETE /access/:id]', () => {
    return agent.delete(`/access/${id}`).expect(204)
  })

  afterAll(async () => {
    await app.close()
  })
})
