import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ContractModule } from 'src/domains/core/contract/contract.module'
import { IContract } from '../../../../src/domains/core/contract/contract.types'
import { oneContractFixture } from 'src/domains/core/contract/test/fixtures'
import { MoveModule } from 'src/domains/core/move/move.module'
import { RenewModule } from 'src/domains/core/renew/renew.module'
import * as request from 'supertest'

describe('Contract - /contract (e2e)', () => {
  const contract: IContract = oneContractFixture

  let app: INestApplication
  let id: number

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3307,
          username: 'tretori-user',
          password: 'tr3t0r!',
          database: 'tretori-test',
          entities: ['src/**/*.entity.ts'],
          synchronize: true,
        }),
        ContractModule,
        MoveModule,
        RenewModule,
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('Create [POST /contract]', () => {
    return request(app.getHttpServer())
      .post('/contract')
      .send(contract as IContract)
      .expect(201)
      .then(({ body }) => {
        id = body.id
        expect(body).toEqual({ ...contract, id: body.id })
      })
  })

  it('Get all contract [GET /contract]', () => {
    return request(app.getHttpServer())
      .get('/contract')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Get one contract [GET /contract/:id]', () => {
    return request(app.getHttpServer())
      .get(`/contract/${id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  // TODO add update test

  it('Delete one contract [DELETE /contract/:id]', () => {
    return request(app.getHttpServer()).delete(`/contract/${id}`).expect(200)
  })

  afterAll(async () => {
    await app.close()
  })
})
