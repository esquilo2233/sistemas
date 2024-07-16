import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ExtraService } from './extra.service';
import { Prisma, Extra } from '@prisma/client';
import { CreateExtraDto } from './dto/create-extra.dto';
import { JwtAuthGuardForGet } from '../auth/jwt-auth-guard.for.get';
import { JwtAuthGuardForPutDeletePost } from '../auth/jwt-auth-guard.for.putdeletepost';

@Controller('extra')
export class ExtraController {
  constructor(private readonly extraService: ExtraService) {}

  @UseGuards(JwtAuthGuardForGet)
  @Get()
  async getExtras(@Req() req: Request): Promise<Extra[]> {
    return this.extraService.findAll(req);
  }

  @UseGuards(JwtAuthGuardForGet)
  @Get(':id')
  async getExtraById(@Param('id') id: string, @Req() req: Request): Promise<Extra> {
    return this.extraService.findById(Number(id), req);
  }

  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Post()
  async createExtra(@Body() dto: CreateExtraDto, @Req() req: Request): Promise<Extra> {
    return this.extraService.createWithSenatorId(dto, req);
  }

  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Put(':id')
  async updateExtra(@Param('id') id: string, @Body() data: Prisma.ExtraUpdateInput, @Req() req: Request): Promise<Extra> {
    return this.extraService.update(Number(id), data, req);
  }

  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Delete(':id')
  async deleteExtra(@Param('id') id: string, @Req() req: Request): Promise<Extra> {
    return this.extraService.delete(Number(id), req);
  }
}
