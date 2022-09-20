import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IAccess } from 'src/domains/core/access/access.types'
import {
  createAccessFixture,
  updateAccessFixture,
  oneAccessFixture,
} from 'src/domains/core/access/access.fixtures'
import { AccessModule } from 'src/domains/core/access/access.module'

describe('Access - /access (e2e)', () => {
  const access: IAccess = oneAccessFixture
  const createAccess = createAccessFixture
  const updateAccess = updateAccessFixture

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
          autoLoadEntities: true,
          synchronize: true,
        }),
        AccessModule,
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('Create [POST /access]', () => {
    return request(app.getHttpServer())
      .post('/access')
      .send(createAccess)
      .expect(201)
      .then(({ body }) => {
        id = body.id
        expect(body).toEqual({ ...access, id: body.id })
      })
  })

  it('Get access [GET /access]', () => {
    return request(app.getHttpServer())
      .get(`/access/${id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Updates access [PATCH /access/:id]', () => {
    return request(app.getHttpServer())
      .patch(`/access/${id}`)
      .send({ ...updateAccess })
      .expect(200)
  })

  it('Deletes access [DELETE /access/:id]', () => {
    return request(app.getHttpServer()).delete(`/access/${id}`).expect(204)
  })

  afterAll(async () => {
    await app.close()
  })
})
