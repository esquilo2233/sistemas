import { Controller, Get, Post, Put, Delete, Param, Body, Req, UseGuards, NotFoundException } from '@nestjs/common';
import { SenatorService } from './senator.service';
import { Senator } from '@prisma/client';
import { CreateSenatorDto } from './dto/create-senator.dto';
import { Request } from 'express';
import { JwtAuthGuardForGet } from '../auth/jwt-auth-guard.for.get';
import { JwtAuthGuardForPutDeletePost } from '../auth/jwt-auth-guard.for.putdeletepost';

@Controller('senator')
export class SenatorController {
  constructor(private readonly senatorService: SenatorService) {}

  @UseGuards(JwtAuthGuardForGet)
  @Get()
  async getSenators(@Req() req: Request): Promise<Senator[]> {
    return this.senatorService.findAll(req);
  }
  @UseGuards(JwtAuthGuardForGet)
  @Get(':id')
  async getSenatorById(@Param('id') id: string, @Req() req: Request): Promise<Senator> {
    const senator = this.senatorService.findById(Number(id),req);
    if (!senator) {
      throw new NotFoundException(`Extra with ID ${id} not found`);
    }
    return senator
  }
  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Post()
  async create(@Body() createSenatorDto: CreateSenatorDto, @Req() req: Request) {
    return this.senatorService.create(createSenatorDto, req);
  }
  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Put(':id')
  async updateSenator(@Param('id') id: string, @Body() data: CreateSenatorDto, @Req() req: Request): Promise<Senator> {
    return this.senatorService.update(Number(id), data, req);
  }
  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Delete(':id')
  async deleteSenator(@Param('id') id: string, @Req() req: Request): Promise<Senator> {
    return this.senatorService.delete(Number(id), req);
  }
}
