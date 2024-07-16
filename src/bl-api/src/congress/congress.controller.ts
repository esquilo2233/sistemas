import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req, ForbiddenException } from '@nestjs/common';

import { CongressService } from './congress.service';
import { Prisma, CongressNumber } from '@prisma/client';
import { CreateCongressDto } from './dto/create-congress.dto';
import { JwtAuthGuardForPutDeletePost } from 'src/auth/jwt-auth-guard.for.putdeletepost';
import { JwtAuthGuardForGet } from 'src/auth/jwt-auth-guard.for.get';

@Controller('congress')
export class CongressController {
  constructor(private readonly congressService: CongressService) {}

  @UseGuards(JwtAuthGuardForGet)  
  @Get()
  async getCongressNumbers(): Promise<CongressNumber[]> {
    return this.congressService.findAll();
  }

  @UseGuards(JwtAuthGuardForGet)
  @Get(':id')
  async getCongressNumberById(@Param('id') id: string, @Req() req: Request): Promise<CongressNumber> {
    return this.congressService.findById(Number(id));
  }

  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Post()
  async createCongressNumber(@Body() dto: CreateCongressDto, @Req() req): Promise<CongressNumber> {
    return this.congressService.createWithSenatorId(dto);
  }

  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Put(':id')
  async updateCongressNumber(@Param('id') id: string, @Body() data: Prisma.CongressNumberUpdateInput, @Req() req): Promise<CongressNumber> {
    return this.congressService.update(Number(id), data);
  }

  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Delete(':id')
  async deleteCongressNumber(@Param('id') id: string, @Req() req): Promise<CongressNumber> {
    return this.congressService.delete(Number(id));
  }
}
