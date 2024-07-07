import { Module } from '@nestjs/common';
import { CongressService } from './congress.service';
import { CongressController } from './congress.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CongressController],
  providers: [CongressService, PrismaService],
})
export class CongressModule {}
