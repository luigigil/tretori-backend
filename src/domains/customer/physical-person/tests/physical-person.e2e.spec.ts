import { INestApplication } from '@nestjs/common'
import { IPhysicalPerson } from '~/domains/customer/physical-person/physical-person.types'
import { onePhysicalPersonFixture } from '~/domains/customer/physical-person/tests/fixtures'
import { buildAppModule, buildRequester } from '~/shared/tests/helpers/app.builder'

describe('Physical Person - /physical-people (e2e)', () => {
  const physicalPerson: IPhysicalPerson = onePhysicalPersonFixture

  let app: INestApplication
  let id: number
  let agent

  beforeAll(async () => {
    app = await buildAppModule()
    agent = buildRequester(app)
  })

  it('Create [POST /physical-people]', () => {
    return agent
      .post('/physical-people')
      .send(physicalPerson as IPhysicalPerson)
      .expect(201)
      .then(({ body }) => {
        id = body.id
        expect(body).toEqual({ ...physicalPerson, id: body.id })
      })
  })

  it('Get all physical person [GET /physical-people]', () => {
    return agent
      .get('/physical-people')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Get one physical person [GET /physical-people/:id]', () => {
    return agent
      .get(`/physical-people/${id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  // TODO - test update

  it('Delete one physical person [DELETE /physical-people/:id]', () => {
    return agent.delete(`/physical-people/${id}`).expect(204)
  })

  afterAll(async () => {
    await app.close()
  })
})
