import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IProduct } from 'src/domains/product/product.types'
import { oneProductFixture } from 'src/domains/product/test/fixtures'
import { ProductModule } from 'src/domains/product/product.module'

describe('Product - /product (e2e)', () => {
  const product: IProduct = oneProductFixture

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
        ProductModule,
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('Create [POST /product]', () => {
    return request(app.getHttpServer())
      .post('/product')
      .send(product as IProduct)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual({ ...product, id: body.id })
      })
  })

  it('Get all product [GET /product]', () => {
    return request(app.getHttpServer())
      .get('/product')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Get one product [GET /product/:id]', () => {
    return request(app.getHttpServer())
      .get('/product/2')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Delete one product [DELETE /product/:id]', () => {
    return request(app.getHttpServer()).delete('/product/1').expect(200)
  })

  afterAll(async () => {
    await app.close()
  })
})
