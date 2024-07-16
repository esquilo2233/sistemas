import { Module } from '@nestjs/common';
import { SenatorModule } from './senator/senator.module';
import { PrismaModule } from '../prisma/prisma.module';
import { DataModule } from './data/data.module';
import { CongressModule } from './congress/congress.module';
import { ExtraModule } from './extra/extra.module';

import { AuthModule } from './auth/auth.module';



@Module({
  imports: [SenatorModule, PrismaModule, DataModule, DataModule, CongressModule, ExtraModule,AuthModule],
})
export class AppModule {}
