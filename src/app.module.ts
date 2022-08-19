import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LegalPersonModule } from './domains/client/legal-person/legal-person.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'tretori-user',
      password: 'tr3t0r!',
      database: 'tretori-dev',
      autoLoadEntities: true,
      synchronize: true,
    }),
    LegalPersonModule,
  ],
})
export class AppModule {}
