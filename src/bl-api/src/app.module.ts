import { Module } from '@nestjs/common';
import { SenatorModule } from './senator/senator.module';
import { PrismaModule } from '../prisma/prisma.module';


@Module({
  imports: [SenatorModule, PrismaModule],
})
export class AppModule {}
