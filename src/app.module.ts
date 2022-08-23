import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccessModule } from './domains/contract/access/acces.module'
import { LegalPersonModule } from './domains/customer/legal-person/legal-person.module'
import { PhysicalPersonModule } from './domains/customer/physical-person/physical-person.module'

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
    PhysicalPersonModule,
  ],
})
export class AppModule {}
