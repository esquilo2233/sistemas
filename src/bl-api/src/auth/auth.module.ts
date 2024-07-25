import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuardForGet } from './jwt-auth-guard.for.get';
import { JwtAuthGuardForDelete } from './jwt-auth-guard.forDelete';
import { JwtAuthGuardForEdit } from './jwt-auth-guard.forEdit';

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
  providers: [ JwtAuthGuardForGet, JwtAuthGuardForDelete,JwtAuthGuardForEdit],
  exports: [JwtModule, PassportModule, JwtAuthGuardForGet, JwtAuthGuardForDelete,JwtAuthGuardForEdit],
})
export class AuthModule {}
