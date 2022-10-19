import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccessModule } from 'domains/core/access/access.module'
import { ContractModule } from 'domains/core/contract/contract.module'
import { MoveModule } from 'domains/core/move/move.module'
import { RenewModule } from 'domains/core/renew/renew.module'
import { CustomerModule } from 'domains/customer/customer/customer.module'
import { LegalPersonModule } from 'domains/customer/legal-person/legal-person.module'
import { PhysicalPersonModule } from 'domains/customer/physical-person/physical-person.module'
import { InsuranceModule } from 'domains/insurance/insurance.module'
import { ProductModule } from 'domains/product/product.module'
import { RepresentativeModule } from 'domains/representative/representative.module'
import { AuthModule } from 'shared/auth/auth.module'
import { RolesGuard } from 'shared/roles/roles.guard'
import { UsersModule } from 'shared/users/users.module'

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
    CustomerModule,
    ContractModule,
    InsuranceModule,
    MoveModule,
    LegalPersonModule,
    PhysicalPersonModule,
    RepresentativeModule,
    ProductModule,
    RenewModule,
    AuthModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
