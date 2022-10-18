import { INestApplication } from '@nestjs/common'
import { IRenew } from '../../../../src/domains/core/renew/renew.types'
import { oneRenewFixture } from '../../../../src/domains/core/renew/test/fixtures'
import { buildAppModule, buildRequester } from '../../../helpers/app.builder'

describe('Renew - /renew (e2e)', () => {
  const renew: IRenew = oneRenewFixture

  let app: INestApplication
  let agent

  beforeAll(async () => {
    app = await buildAppModule()
    agent = buildRequester(app)
  })

  it('Create [POST /renew]', () => {
    return agent
      .post('/renew')
      .send(renew)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual({ ...renew, id: body.id })
      })
  })

  it('Get all renew [GET /renew]', () => {
    return agent
      .get('/renew')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
