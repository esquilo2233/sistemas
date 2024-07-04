import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SenatorService } from './senator.service';
import { Prisma, Senator } from '@prisma/client';
import { CreateSenatorDto } from './dto/create-senator.dto';

@Controller('senators')
export class SenatorController {
  constructor(private readonly senatorService: SenatorService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getSenators(): Promise<Senator[]> {
    return this.senatorService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createSenator(@Body() data: CreateSenatorDto): Promise<Senator> {
    return this.senatorService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateSenator(@Param('id') id: string, @Body() data: Prisma.SenatorUpdateInput): Promise<Senator> {
    return this.senatorService.update(Number(id), data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteSenator(@Param('id') id: string): Promise<Senator> {
    return this.senatorService.delete(Number(id));
  }
}
