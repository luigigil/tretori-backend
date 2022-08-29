import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccessModule } from './domains/core/access/access.module'
import { ContractModule } from './domains/core/contract/contract.module'
import { MoveModule } from './domains/core/move/move.module'
import { RenewModule } from './domains/core/renew/renew.module'
import { LegalPersonModule } from './domains/customer/legal-person/legal-person.module'
import { PhysicalPersonModule } from './domains/customer/physical-person/physical-person.module'
import { ProductModule } from './domains/product/product.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      autoLoadEntities: process.env.DB_AUTOLOAD_ENTITIES === 'true',
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      url: process.env.CLEARDB_DATABASE_URL,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    }),
    AccessModule,
    ContractModule,
    MoveModule,
    LegalPersonModule,
    PhysicalPersonModule,
    ProductModule,
    RenewModule,
  ],
})
export class AppModule {}
