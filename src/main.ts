import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as Sentry from '@sentry/node'
import { AppModule } from 'app.module'
import * as cookieParser from 'cookie-parser'
import { StatsD } from 'hot-shots'
import 'src/tracer'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: true })
  const dogstatsd = new StatsD()

  Sentry.init({
    dsn: 'https://82c5faf5313d4b44acb22a942e81cf5d@o4504010506174464.ingest.sentry.io/4504010852073472',
    tracesSampleRate: 1.0,
  })

  const transaction = Sentry.startTransaction({
    op: 'test',
    name: 'My First Test Transaction',
  })

  setTimeout(() => {
    try {
      throw new Error('Broke')
    } catch (e) {
      Sentry.captureException(e)
    } finally {
      transaction.finish()
    }
  }, 99)

  const config = new DocumentBuilder()
    .setTitle('Tretori')
    .setDescription('The Tretori API description')
    .setVersion('1.0')
    .addTag('tretori')
    // .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.use(cookieParser())

  await app.listen(process.env.PORT || 3000)

  dogstatsd.increment('tretori.app.started')
}
bootstrap()
