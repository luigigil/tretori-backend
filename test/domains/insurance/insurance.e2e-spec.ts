import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IInsurance } from '../../../src/domains/insurance/insurance.types'
import { oneInsuranceFixture } from '../../../src/domains/insurance/test/fixtures'
import { InsuranceModule } from '../../../src/domains/insurance/insurance.module'
import * as request from 'supertest'

describe('Insurance - /insurance (e2e)', () => {
  const insurance: IInsurance = oneInsuranceFixture

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
        InsuranceModule,
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('Create [POST /insurance]', () => {
    return request(app.getHttpServer())
      .post('/insurance')
      .send(insurance as IInsurance)
      .expect(201)
      .then(({ body }) => {
        id = body.id
        expect(body).toEqual({ ...insurance, id: body.id })
      })
  })

  it('Get all Insurance [GET /insurance]', () => {
    return request(app.getHttpServer())
      .get('/insurance')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Get one Insurance [GET /insurance/:id]', () => {
    return request(app.getHttpServer())
      .get(`/insurance/${id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  // TODO - test update

  it('Delete one Insurance [DELETE /insurance/:id]', () => {
    return request(app.getHttpServer()).delete(`/insurance/${id}`).expect(200)
  })

  afterAll(async () => {
    await app.close()
  })
})
