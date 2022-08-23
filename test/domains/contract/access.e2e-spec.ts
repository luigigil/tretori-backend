import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IAccess } from 'src/domains/contract/common/contract.types'
import {
  createAccessFixture,
  updateAccessFixture,
  accessFixture,
} from 'src/domains/contract/access/fixtures/index'
import { AccessModule } from 'src/domains/contract/access/access.module'

describe('Access - /access (e2e)', () => {
  const access: IAccess = accessFixture

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
        AccessModule,
      ],
    }).compile()
  
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('Create [POST /access]', () => {
    return request(app.getHttpServer())
      .post('/access')
      .send(access as IAccess)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual({ ...access, id: body.id })
      })
  })

})
