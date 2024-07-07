// src/senator/senator.module.ts
import { Module } from '@nestjs/common';
import { SenatorController } from './senator.controller';
import { SenatorService } from './senator.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Module({
  controllers: [SenatorController],
  providers: [SenatorService, PrismaService, JwtAuthGuard],
})
export class SenatorModule {}
