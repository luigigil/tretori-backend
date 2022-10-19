import { INestApplication } from '@nestjs/common'
import { ILegalPerson } from 'domains/customer/legal-person/legal-person.types'
import { oneLegalPersonFixture } from 'domains/customer/legal-person/tests/fixtures'
import { buildAppModule, buildRequester } from 'shared/tests/helpers/app.builder'

describe('Legal Person - /legal-people (e2e)', () => {
  const legalPerson: ILegalPerson = oneLegalPersonFixture

  let app: INestApplication
  let id: number
  let agent

  beforeAll(async () => {
    app = await buildAppModule()
    agent = buildRequester(app)
  })

  it('Create [POST /legal-people]', () => {
    return agent
      .post('/legal-people')
      .send(legalPerson as ILegalPerson)
      .expect(201)
      .then(({ body }) => {
        id = body.id
        expect(body).toEqual({ ...legalPerson, id: body.id })
      })
  })

  it('Get all legal person [GET /legal-people]', () => {
    return agent
      .get('/legal-people')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Get one legal person [GET /legal-people/:id]', () => {
    return agent
      .get(`/legal-people/${id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  // TODO - test update

  it('Delete one legal person [DELETE /legal-people/:id]', () => {
    return agent.delete(`/legal-people/${id}`).expect(200)
  })

  afterAll(async () => {
    await app.close()
  })
})
