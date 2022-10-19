import { INestApplication } from '@nestjs/common'
import { IPhysicalPerson } from 'domains/customer/physical-person/physical-person.types'
import { onePhysicalPersonFixture } from 'domains/customer/physical-person/tests/fixtures'
import { buildAppModule, buildRequester } from 'shared/tests/helpers/app.builder'

describe('Physical Person - /physical-person (e2e)', () => {
  const physicalPerson: IPhysicalPerson = onePhysicalPersonFixture

  let app: INestApplication
  let id: number
  let agent

  beforeAll(async () => {
    app = await buildAppModule()
    agent = buildRequester(app)
  })

  it('Create [POST /physical-person]', () => {
    return agent
      .post('/physical-person')
      .send(physicalPerson as IPhysicalPerson)
      .expect(201)
      .then(({ body }) => {
        id = body.id
        expect(body).toEqual({ ...physicalPerson, id: body.id })
      })
  })

  it('Get all physical person [GET /physical-person]', () => {
    return agent
      .get('/physical-person')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Get one physical person [GET /physical-person/:id]', () => {
    return agent
      .get(`/physical-person/${id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  // TODO - test update

  it('Delete one physical person [DELETE /physical-person/:id]', () => {
    return agent.delete(`/physical-person/${id}`).expect(204)
  })

  afterAll(async () => {
    await app.close()
  })
})
