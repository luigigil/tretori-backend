import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from '~/shared/auth/auth.controller'
import { AuthService } from '~/shared/auth/auth.service'
import { jwtConstants } from '~/shared/auth/constants'
import { JwtStrategy } from '~/shared/auth/strategies/jwt.strategy'
import { LocalStrategy } from '~/shared/auth/strategies/local.strategy'
import { UsersModule } from '~/shared/users/users.module'

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
