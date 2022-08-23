import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ILegalPerson } from 'src/domains/customer/common/customer.types'
import { oneLegalPersonFixture } from 'src/domains/customer/legal-person/fixtures'
import { LegalPersonModule } from 'src/domains/customer/legal-person/legal-person.module'
import * as request from 'supertest'

describe('Legal Person - /legal-person (e2e)', () => {
  const legalPerson: ILegalPerson = oneLegalPersonFixture

  let app: INestApplication

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
          autoLoadEntities: true,
          synchronize: true,
        }),
        LegalPersonModule,
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('Create [POST /legal-person]', () => {
    return request(app.getHttpServer())
      .post('/legal-person')
      .send(legalPerson as ILegalPerson)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual({ ...legalPerson, id: body.id })
      })
  })

  it('Get all legal person [GET /legal-person]', () => {
    return request(app.getHttpServer())
      .get('/legal-person')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Get one legal person [GET /legal-person/:id]', () => {
    return request(app.getHttpServer())
      .get('/legal-person/2')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Delete one legal person [DELETE /legal-person/:id]', () => {
    return request(app.getHttpServer()).delete('/legal-person/1').expect(200)
  })

  afterAll(async () => {
    await app.close()
  })
})
