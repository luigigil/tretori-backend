import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IPhysicalPerson } from 'src/domains/customer/common/customer.types'
import { onePhysicalPersonFixture } from 'src/domains/customer/physical-person/test/fixtures'
import { PhysicalPersonModule } from 'src/domains/customer/physical-person/physical-person.module'

describe('Physical Person - /physical-person (e2e)', () => {
  const physicalPerson: IPhysicalPerson = onePhysicalPersonFixture

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
        PhysicalPersonModule,
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('Create [POST /physical-person]', () => {
    return request(app.getHttpServer())
      .post('/physical-person')
      .send(physicalPerson as IPhysicalPerson)
      .expect(201)
      .then(({ body }) => {
        id = body.id
        expect(body).toEqual({ ...physicalPerson, id: body.id })
      })
  })

  it('Get all physical person [GET /physical-person]', () => {
    return request(app.getHttpServer())
      .get('/physical-person')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Get one physical person [GET /physical-person/:id]', () => {
    return request(app.getHttpServer())
      .get(`/physical-person/${id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  // TODO - test update

  it('Delete one physical person [DELETE /physical-person/:id]', () => {
    return request(app.getHttpServer()).delete(`/physical-person/${id}`).expect(200)
  })

  afterAll(async () => {
    await app.close()
  })
})
