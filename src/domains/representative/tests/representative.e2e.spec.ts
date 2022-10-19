import { INestApplication } from '@nestjs/common'
import { IRepresentative } from '~/domains/representative/representative.types'
import {
  CreateRepresentativeFixture,
  RepresentativeFixture,
  UpdateRepresentativeFixture,
} from '~/domains/representative/tests/fixtures'
import { buildAppModule, buildRequester } from '~/shared/tests/helpers/app.builder'

describe('Representative - /representatives (e2e)', () => {
  const representative: IRepresentative = RepresentativeFixture
  const createRepresentative = CreateRepresentativeFixture
  const updateRepresentative = UpdateRepresentativeFixture

  let app: INestApplication
  let id: number
  let agent

  beforeAll(async () => {
    app = await buildAppModule()
    agent = buildRequester(app)
  })

  it('Create [POST /representatives]', () => {
    return agent
      .post('/representatives')
      .send(createRepresentative)
      .expect(201)
      .then(({ body }) => {
        id = body.id
        expect(body).toEqual({ ...representative, id: body.id, company: null })
      })
  })

  it('should be defined', () => {
    expect(app).toBeDefined()
    expect(id).toBeDefined()
  })

  it('Get all representative [GET /representatives]', () => {
    return agent
      .get('/representatives/')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Get representative [GET /representatives/id]', () => {
    return agent
      .get(`/representatives/${id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Updates representative [PATCH /representatives/:id]', () => {
    return agent
      .patch(`/representatives/${id}`)
      .send({ ...updateRepresentative })
      .expect(200)
  })

  it('Deletes representative [DELETE /representatives/:id]', () => {
    return agent.delete(`/representatives/${id}`).expect(200)
  })

  afterAll(async () => {
    await app.close()
  })
})
