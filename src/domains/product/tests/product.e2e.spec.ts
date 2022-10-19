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

  it('Create [POST /products]', () => {
    return agent
      .post('/products')
      .send(product as IProduct)
      .expect(201)
      .then(({ body }) => {
        id = body.id
        expect(body).toEqual({ ...product, id: body.id })
      })
  })

  it('Get all product [GET /products]', () => {
    return agent
      .get('/products')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  it('Get one product [GET /products/:id]', () => {
    return agent
      .get(`/products/${id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  // TODO: test update

  it('Delete one product [DELETE /products/:id]', () => {
    return agent.delete(`/products/${id}`).expect(200)
  })

  afterAll(async () => {
    await app.close()
  })
})
