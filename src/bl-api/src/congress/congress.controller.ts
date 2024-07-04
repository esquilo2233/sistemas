import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CongressService } from './congress.service';
import { Prisma, CongressNumber } from '@prisma/client';
import { CreateCongressDto } from './dto/create-congress.dto';

@Controller('congress')
export class CongressController {
  constructor(private readonly congressService: CongressService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCongressNumbers(): Promise<CongressNumber[]> {
    return this.congressService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCongressNumber(@Body() dto: CreateCongressDto): Promise<CongressNumber> {
    return this.congressService.createWithSenatorId(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateCongressNumber(@Param('id') id: string, @Body() data: Prisma.CongressNumberUpdateInput): Promise<CongressNumber> {
    return this.congressService.update(Number(id), data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCongressNumber(@Param('id') id: string): Promise<CongressNumber> {
    return this.congressService.delete(Number(id));
  }
}
