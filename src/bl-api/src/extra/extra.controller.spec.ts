import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ExtraService } from './extra.service';
import { Prisma, Extra } from '@prisma/client';
import { CreateExtraDto } from './dto/create-extra.dto';

@Controller('extra')
export class ExtraController {
  constructor(private readonly extraService: ExtraService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getExtras(): Promise<Extra[]> {
    return this.extraService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createExtra(@Body() dto: CreateExtraDto, @Req() req): Promise<Extra> {
    if (req.user.role !== 'admin' && req.user.role !== 'edit') {
      throw new ForbiddenException('Access denied');
    }
    return this.extraService.createWithSenatorId(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateExtra(@Param('id') id: string, @Body() data: Prisma.ExtraUpdateInput, @Req() req): Promise<Extra> {
    if (req.user.role !== 'admin' && req.user.role !== 'edit') {
      throw new ForbiddenException('Access denied');
    }
    return this.extraService.update(Number(id), data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteExtra(@Param('id') id: string, @Req() req): Promise<Extra> {
    if (req.user.role !== 'admin' && req.user.role !== 'edit') {
      throw new ForbiddenException('Access denied');
    }
    return this.extraService.delete(Number(id));
  }
}
