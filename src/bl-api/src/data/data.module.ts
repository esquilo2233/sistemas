import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [DataController],
  providers: [DataService, PrismaService]
})
export class DataModule {}
