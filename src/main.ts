import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import helmet from 'helmet'
import * as csurf from 'csurf'
import * as cookieParser from 'cookie-parser'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: true })

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
}
bootstrap()
