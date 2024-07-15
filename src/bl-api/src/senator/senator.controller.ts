import { Controller, Get, Post, Put, Delete, Param, Body, Req } from '@nestjs/common';
import { SenatorService } from './senator.service';
import { Senator } from '@prisma/client';
import { CreateSenatorDto } from './dto/create-senator.dto';
import { Request } from 'express';

@Controller('senator')
export class SenatorController {
  constructor(private readonly senatorService: SenatorService) {}

  @Get()
  async getSenators(): Promise<Senator[]> {
    return this.senatorService.findAll();
  }

  @Get(':id')
  async getSenatorById(@Param('id') id: string): Promise<Senator> {
    return this.senatorService.findById(Number(id));
  }

  @Post()
  async create(@Body() createSenatorDto: CreateSenatorDto, @Req() req: Request) {
    return this.senatorService.create(createSenatorDto, req);
  }

  @Put(':id')
  async updateSenator(@Param('id') id: string, @Body() data: CreateSenatorDto, @Req() req: Request): Promise<Senator> {
    return this.senatorService.update(Number(id), data);
  }

  @Delete(':id')
  async deleteSenator(@Param('id') id: string, @Req() req: Request): Promise<Senator> {
    return this.senatorService.delete(Number(id));
  }
}
