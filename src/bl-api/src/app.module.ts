import { Module } from '@nestjs/common';
import { SenatorModule } from './senator/senator.module';
import { PrismaModule } from '../prisma/prisma.module';
import { DataModule } from './data/data.module';



@Module({
  imports: [SenatorModule, PrismaModule, DataModule],
})
export class AppModule {}
