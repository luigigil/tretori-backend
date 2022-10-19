import { INestApplication } from '@nestjs/common'
import { IInsurance } from 'domains/insurance/insurance.types'
import { oneInsuranceFixture } from 'domains/insurance/tests/fixtures'
import { buildAppModule, buildRequester } from 'shared/tests/helpers/app.builder'

describe('Insurance - /insurance (e2e)', () => {
  const insurance: IInsurance = oneInsuranceFixture

  let app: INestApplication
  let id: number
  let agent

  beforeAll(async () => {
    app = await buildAppModule()
    agent = buildRequester(app)
  })

  it('Create [POST /insurance]', () => {
    return agent
      .post('/insurance')
      .send(insurance as IInsurance)
      .expect(201)
      .then(({ body }) => {
        id = body.id
        expect(body).toEqual({ ...insurance, id: body.id })
      })
  })

  it('Get all Insurance [GET /insurance]', () => {
    return agent
      .get('/insurance')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Get one Insurance [GET /insurance/:id]', () => {
    return agent
      .get(`/insurance/${id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  // Teste para criação da rota de update
  // it('Update one Insurance [PATCH /insurance/:id]', () => {
  //   return agent
  //     .patch(`/insurance/${id}`)
  //     .send({ cnpj: '23789' })
  //     .expect(200)
  //     .then(({ body }) => {
  //       expect(body).toBeDefined()
  //     })
  // })

  it('Delete one Insurance [DELETE /insurance/:id]', () => {
    return agent
      .delete(`/insurance/${id}`)
      .expect(204)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Should throw a NotFound Exception [DELETE /insurance/:id]', () => {
    return agent.delete(`/insurance/${id * 2}`).expect(404)
  })

  afterAll(async () => {
    await app.close()
  })
})
