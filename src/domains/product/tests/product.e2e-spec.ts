import { INestApplication } from '@nestjs/common'
import { IProduct } from 'domains/product/product.types'
import { oneProductFixture } from 'domains/product/tests/fixtures'
import { buildAppModule, buildRequester } from 'shared/tests/helpers/app.builder'

describe('Product - /product (e2e)', () => {
  const product: IProduct = oneProductFixture

  let app: INestApplication
  let id: number
  let agent

  beforeAll(async () => {
    app = await buildAppModule()
    agent = buildRequester(app)
  })

  it('Create [POST /product]', () => {
    return agent
      .post('/product')
      .send(product as IProduct)
      .expect(201)
      .then(({ body }) => {
        id = body.id
        expect(body).toEqual({ ...product, id: body.id })
      })
  })

  it('Get all product [GET /product]', () => {
    return agent
      .get('/product')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Get one product [GET /product/:id]', () => {
    return agent
      .get(`/product/${id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  // TODO: test update

  it('Delete one product [DELETE /product/:id]', () => {
    return agent.delete(`/product/${id}`).expect(200)
  })

  afterAll(async () => {
    await app.close()
  })
})
