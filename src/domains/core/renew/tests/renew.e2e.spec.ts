import { INestApplication } from '@nestjs/common'
import { IRenew } from '~/domains/core/renew/renew.types'
import { oneRenewFixture } from '~/domains/core/renew/tests/fixtures'
import { buildAppModule, buildRequester } from '~/shared/tests/helpers/app.builder'

describe('Renew - /renewals (e2e)', () => {
  const renew: IRenew = oneRenewFixture

  let app: INestApplication
  let agent

  beforeAll(async () => {
    app = await buildAppModule()
    agent = buildRequester(app)
  })

  it('Create [POST /renewals]', () => {
    return agent
      .post('/renewals')
      .send(renew)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual({ ...renew, id: body.id })
      })
  })

  it('Get all renew [GET /renewals]', () => {
    return agent
      .get('/renewals')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
