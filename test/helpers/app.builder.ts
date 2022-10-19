import { INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as request from 'supertest'
import { AccessModule } from '../../src/domains/core/access/access.module'
import { ContractModule } from '../../src/domains/core/contract/contract.module'
import { MoveModule } from '../../src/domains/core/move/move.module'
import { RenewModule } from '../../src/domains/core/renew/renew.module'
import { CustomerModule } from '../../src/domains/customer/customer/customer.module'
import { LegalPersonModule } from '../../src/domains/customer/legal-person/legal-person.module'
import { PhysicalPersonModule } from '../../src/domains/customer/physical-person/physical-person.module'
import { InsuranceModule } from '../../src/domains/insurance/insurance.module'
import { ProductModule } from '../../src/domains/product/product.module'
import { RepresentativeModule } from '../../src/domains/representative/representative.module'
import { AuthModule } from '../../src/shared/auth/auth.module'
import { RolesGuard } from '../../src/shared/roles/roles.guard'
import { UsersModule } from '../../src/shared/users/users.module'
import { UsersService } from '../../src/shared/users/users.service'

export async function buildAppModule(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot(),
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
      CustomerModule,
      ContractModule,
      InsuranceModule,
      MoveModule,
      LegalPersonModule,
      PhysicalPersonModule,
      RepresentativeModule,
      ProductModule,
      RenewModule,
      AuthModule,
      UsersModule,
    ],
    providers: [
      {
        provide: APP_GUARD,
        useClass: RolesGuard,
      },
    ],
  }).compile()

  const app = moduleFixture.createNestApplication()

  await app.init()

  const uMod = await app.resolve(UsersService)

  let user

  try {
    user = await uMod.findOneByUsername('dev-admin@tretori.com')
  } catch (error) {
    user = await uMod.create({
      username: 'dev-admin@tretori.com',
      password: 'teste1234',
      roles: 'admin',
    })
  }

  expect(user).toBeDefined()
  expect(user.username).toBe('dev-admin@tretori.com')
  expect(user.roles).toBe('admin')

  const loginReponse = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ username: 'dev-admin@tretori.com', password: 'teste1234' })
    .expect(201)

  const { access_token } = loginReponse.body

  process.env.ACCESS_TOKEN = access_token

  expect(process.env.ACCESS_TOKEN).toBeDefined()

  return app
}

export function buildRequester(app: INestApplication): unknown {
  const defaultAgent = new Proxy(request(app.getHttpServer()), {
    get:
      (target, name) =>
      (...args) =>
        (target as unknown)[name](...args).set({
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          Accept: 'application/json',
        }),
  })

  return defaultAgent
}
