// src/senator/senator.module.ts
import { Module } from '@nestjs/common';
import { SenatorController } from './senator.controller';
import { SenatorService } from './senator.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [SenatorController],
  providers: [SenatorService, PrismaService],
})
export class SenatorModule {}
