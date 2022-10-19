import { INestApplication } from '@nestjs/common'
import { IContract } from 'domains/core/contract/contract.types'
import { oneContractFixture } from 'domains/core/contract/tests/fixtures'
import { buildAppModule, buildRequester } from 'shared/tests/helpers/app.builder'

describe('Contract - /contract (e2e)', () => {
  const contract: IContract = oneContractFixture

  let app: INestApplication
  let id: number
  let agent

  beforeAll(async () => {
    app = await buildAppModule()
    agent = buildRequester(app)
  })

  it('Create [POST /contract]', () => {
    return agent
      .post('/contracts')
      .send(contract as IContract)
      .expect(201)
      .then(({ body }) => {
        id = body.id
        expect(body).toEqual({ ...contract, id: body.id })
      })
  })

  it('Get all contract [GET /contract]', () => {
    return agent
      .get('/contracts')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Get one contract [GET /contract/:id]', () => {
    return agent
      .get(`/contracts/${id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  // TODO add update test

  it('Delete one contract [DELETE /contract/:id]', () => {
    return agent.delete(`/contracts/${id}`).expect(200)
  })

  afterAll(async () => {
    await app.close()
  })
})
