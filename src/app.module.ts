import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LegalPersonModule } from './domains/client/legal-person/legal-person.module'
import { AccessModule } from './domains/contract/access/acces.module'

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
    AccessModule,
    LegalPersonModule,
  ],
})
export class AppModule {}
