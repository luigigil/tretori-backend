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

  it('Create [POST /insurances]', () => {
    return agent
      .post('/insurances')
      .send(insurance as IInsurance)
      .expect(201)
      .then(({ body }) => {
        id = body.id
        expect(body).toEqual({ ...insurance, id: body.id })
      })
  })

  it('Get all Insurance [GET /insurances]', () => {
    return agent
      .get('/insurances')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Get one Insurance [GET /insurances/:id]', () => {
    return agent
      .get(`/insurances/${id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  // Teste para criação da rota de update
  // it('Update one Insurance [PATCH /insurances/:id]', () => {
  //   return agent
  //     .patch(`/insurances/${id}`)
  //     .send({ cnpj: '23789' })
  //     .expect(200)
  //     .then(({ body }) => {
  //       expect(body).toBeDefined()
  //     })
  // })

  it('Delete one Insurance [DELETE /insurances/:id]', () => {
    return agent
      .delete(`/insurances/${id}`)
      .expect(204)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Should throw a NotFound Exception [DELETE /insurances/:id]', () => {
    return agent.delete(`/insurances/${id * 2}`).expect(404)
  })

  afterAll(async () => {
    await app.close()
  })
})
