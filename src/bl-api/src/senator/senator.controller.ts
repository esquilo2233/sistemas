import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { SenatorService } from './senator.service';
import { Senator, Prisma } from '@prisma/client';
import { CreateSenatorDto } from './dto/create-senator.dto';
import { Request } from 'express';

@Controller('senator')
export class SenatorController {
  constructor(private readonly senatorService: SenatorService) {}

  @Get()
  async getSenators(): Promise<Senator[]> {
    return this.senatorService.findAll();
  }

 
  @Post()
  async createSenator(@Body() data: CreateSenatorDto, @Req() req: Request): Promise<Senator> {
    return this.senatorService.create(data);
  }

  
  @Put(':id')
  async updateSenator(@Param('id') id: string, @Body() data: Prisma.SenatorUpdateInput, @Req() req: Request): Promise<Senator> {
    return this.senatorService.update(Number(id), data);
  }

 
  @Delete(':id')
  async deleteSenator(@Param('id') id: string, @Req() req: Request): Promise<Senator> {
    return this.senatorService.delete(Number(id));
  }
}
