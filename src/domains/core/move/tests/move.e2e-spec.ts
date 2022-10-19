import { INestApplication } from '@nestjs/common'
import { IMove } from 'domains/core/move/move.types'
import { oneMoveFixture } from 'domains/core/move/tests/fixtures'
import { buildAppModule, buildRequester } from 'shared/tests/helpers/app.builder'

describe('Move - /move (e2e)', () => {
  const move: IMove = oneMoveFixture

  let app: INestApplication
  let agent

  beforeAll(async () => {
    app = await buildAppModule()
    agent = buildRequester(app)
  })

  it('Create [POST /move]', () => {
    return agent
      .post('/move')
      .send(move)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual({ ...move, id: body.id })
      })
  })

  it('Get all move [GET /move]', () => {
    return agent
      .get('/move')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
