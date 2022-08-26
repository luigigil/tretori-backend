import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IRenew } from 'src/domains/core/renew/renew.types'
import { oneRenewFixture } from 'src/domains/core/renew/test/fixtures'
import { RenewModule } from 'src/domains/core/renew/renew.module'

describe('Renew - /renew (e2e)', () => {
  const renew: IRenew = oneRenewFixture

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
        RenewModule,
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('Create [POST /renew]', () => {
    return request(app.getHttpServer())
      .post('/renew')
      .send(renew as IRenew)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual({ ...renew, id: body.id })
      })
  })

  it('Get all renew [GET /renew]', () => {
    return request(app.getHttpServer())
      .get('/renew')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Get one renew [GET /renew/:id]', () => {
    return request(app.getHttpServer())
      .get('/renew/2')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Delete one renew [DELETE /renew/:id]', () => {
    return request(app.getHttpServer()).delete('/renew/1').expect(200)
  })

  afterAll(async () => {
    await app.close()
  })
})
