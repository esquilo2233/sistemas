import { Module } from '@nestjs/common';
import { SenatorService } from './senator.service';
import { SenatorController } from './senator.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [SenatorController],
  providers: [SenatorService, PrismaService],
})
export class SenatorModule {}
