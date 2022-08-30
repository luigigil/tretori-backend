import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IRepresentative } from 'src/domains/representative/representative.types'
import {
  CreateRepresentativeFixture,
  RepresentativeFixture,
  UpdateRepresentativeFixture,
} from 'src/domains/representative/fixtures/representative.fixtures'
import { RepresentativeModule } from 'src/domains/representative/representative.module'

describe('Representative - /representative (e2e)', () => {
  const representative: IRepresentative = RepresentativeFixture
  const createRepresentative = CreateRepresentativeFixture
  const updateRepresentative = UpdateRepresentativeFixture

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
        RepresentativeModule,
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('Create [POST /representative]', () => {
    return request(app.getHttpServer())
      .post('/representative')
      .send(createRepresentative)
      .expect(201)
      .then(({ body }) => {
        id = body.id
        expect(body).toEqual({ ...representative, id: body.id, company: null })
      })
  })

  it('should be defined', () => {
    expect(app).toBeDefined()
    expect(id).toBeDefined()
  })

  it('Get all representative [GET /representative]', () => {
    return request(app.getHttpServer())
      .get('/representative/')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Get representative [GET /representative/id]', () => {
    return request(app.getHttpServer())
      .get(`/representative/${id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Updates representative [PATCH /representative/:id]', () => {
    return request(app.getHttpServer())
      .patch(`/representative/${id}`)
      .send({ ...updateRepresentative })
      .expect(200)
  })

  it('Deletes representative [DELETE /representative/:id]', () => {
    return request(app.getHttpServer()).delete(`/representative/${id}`).expect(200)
  })

  afterAll(async () => {
    await app.close()
  })
})
