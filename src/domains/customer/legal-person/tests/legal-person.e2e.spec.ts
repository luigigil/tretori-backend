import { INestApplication } from '@nestjs/common'
import { ILegalPerson } from 'domains/customer/legal-person/legal-person.types'
import { oneLegalPersonFixture } from 'domains/customer/legal-person/tests/fixtures'
import { buildAppModule, buildRequester } from 'shared/tests/helpers/app.builder'

describe('Legal Person - /legal-person (e2e)', () => {
  const legalPerson: ILegalPerson = oneLegalPersonFixture

  let app: INestApplication
  let id: number
  let agent

  beforeAll(async () => {
    app = await buildAppModule()
    agent = buildRequester(app)
  })

  it('Create [POST /legal-person]', () => {
    return agent
      .post('/legal-person')
      .send(legalPerson as ILegalPerson)
      .expect(201)
      .then(({ body }) => {
        id = body.id
        expect(body).toEqual({ ...legalPerson, id: body.id })
      })
  })

  it('Get all legal person [GET /legal-person]', () => {
    return agent
      .get('/legal-person')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Get one legal person [GET /legal-person/:id]', () => {
    return agent
      .get(`/legal-person/${id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  // TODO - test update

  it('Delete one legal person [DELETE /legal-person/:id]', () => {
    return agent.delete(`/legal-person/${id}`).expect(200)
  })

  afterAll(async () => {
    await app.close()
  })
})
