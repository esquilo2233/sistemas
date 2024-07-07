import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SenatorService } from './senator.service';
import { Senator, Prisma } from '@prisma/client';
import { CreateSenatorDto } from './dto/create-senator.dto';
import { Request } from 'express';

@Controller('senator')
export class SenatorController {
  constructor(private readonly senatorService: SenatorService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getSenators(): Promise<Senator[]> {
    return this.senatorService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createSenator(@Body() data: CreateSenatorDto, @Req() req: Request): Promise<Senator> {
    if (req.user?.role !== 'admin' && req.user?.role !== 'edit') {
      throw new ForbiddenException('Access denied');
    }
    return this.senatorService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateSenator(@Param('id') id: string, @Body() data: Prisma.SenatorUpdateInput, @Req() req: Request): Promise<Senator> {
    if (req.user?.role !== 'admin' && req.user?.role !== 'edit') {
      throw new ForbiddenException('Access denied');
    }
    return this.senatorService.update(Number(id), data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteSenator(@Param('id') id: string, @Req() req: Request): Promise<Senator> {
    if (req.user?.role !== 'admin' && req.user?.role !== 'edit') {
      throw new ForbiddenException('Access denied');
    }
    return this.senatorService.delete(Number(id));
  }
}
