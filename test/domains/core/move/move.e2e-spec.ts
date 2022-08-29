import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IMove } from 'src/domains/core/move/move.types'
import { oneMoveFixture } from 'src/domains/core/move/test/fixtures'
import { MoveModule } from 'src/domains/core/move/move.module'
import { ContractModule } from 'src/domains/core/contract/contract.module'

describe('Move - /move (e2e)', () => {
  const move: IMove = oneMoveFixture

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
        MoveModule,
        ContractModule,
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('Create [POST /move]', () => {
    return request(app.getHttpServer())
      .post('/move')
      .send(move)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual({ ...move, id: body.id })
      })
  })

  it('Get all move [GET /move]', () => {
    return request(app.getHttpServer())
      .get('/move')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Get one move [GET /move/:id]', () => {
    return request(app.getHttpServer())
      .get('/move/2')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Delete one move [DELETE /move/:id]', () => {
    return request(app.getHttpServer()).delete('/move/1').expect(200)
  })

  afterAll(async () => {
    await app.close()
  })
})
