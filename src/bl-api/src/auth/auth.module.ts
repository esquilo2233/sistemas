import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuardForGet } from './jwt-auth-guard.for.get';
import { JwtAuthGuardForPutDeletePost } from './jwt-auth-guard.for.putdeletepost';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ JwtAuthGuardForGet, JwtAuthGuardForPutDeletePost],
  exports: [JwtModule, PassportModule, JwtAuthGuardForGet, JwtAuthGuardForPutDeletePost],
})
export class AuthModule {}
