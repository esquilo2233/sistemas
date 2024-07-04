import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { SenatorModule } from './senator/senator.module';
import { PrismaService } from './prisma.service';
import { CongressModule } from './congress/congress.module';
import { ExtraModule } from './extra/extra.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    SenatorModule,
    CongressModule,
    ExtraModule,
  ],
  providers: [PrismaService, JwtStrategy],
})
export class AppModule {}
