import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { ExtraService } from './extra.service';
import { Prisma, Extra } from '@prisma/client';
import { CreateExtraDto } from './dto/create-extra.dto';
import { JwtAuthGuardForGet } from '../auth/jwt-auth-guard.for.get';
import { JwtAuthGuardForPutDeletePost } from '../auth/jwt-auth-guard.for.putdeletepost';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiCookieAuth } from '@nestjs/swagger';

@ApiTags('extra')
@ApiBearerAuth()
@ApiCookieAuth()
@Controller('extra')
export class ExtraController {
  constructor(private readonly extraService: ExtraService) {}

  @ApiOperation({ summary: 'Get all extras' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @UseGuards(JwtAuthGuardForGet)
  @Get()
  async getExtras(@Req() req: Request): Promise<Extra[]> {
    return this.extraService.findAll(req);
  }

  @ApiOperation({ summary: 'Get extra by ID' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 404, description: 'Extra not found.' })
  @UseGuards(JwtAuthGuardForGet)
  @Get(':id')
  async getExtraById(@Param('id') id: string, @Req() req: Request): Promise<Extra> {
    const extra = await this.extraService.findById(Number(id), req);
    if (!extra) {
      throw new NotFoundException(`Extra with ID ${id} not found`);
    }
    return extra;
  }

  @ApiOperation({ summary: 'Create a new extra' })
  @ApiResponse({ status: 201, description: 'Extra created successfully.' })
  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Post()
  async createExtra(@Body() dto: CreateExtraDto, @Req() req: Request): Promise<Extra> {
    return this.extraService.createWithSenatorId(dto, req);
  }

  @ApiOperation({ summary: 'Update an existing extra' })
  @ApiResponse({ status: 200, description: 'Extra updated successfully.' })
  @ApiResponse({ status: 404, description: 'Extra not found.' })
  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Put(':id')
  async updateExtra(@Param('id') id: string, @Body() data: Prisma.ExtraUpdateInput, @Req() req: Request): Promise<Extra> {
    return this.extraService.update(Number(id), data, req);
  }

  @ApiOperation({ summary: 'Delete an extra by ID' })
  @ApiResponse({ status: 200, description: 'Extra deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Extra not found.' })
  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Delete(':id')
  async deleteExtra(@Param('id') id: string, @Req() req: Request): Promise<Extra> {
    return this.extraService.delete(Number(id), req);
  }
}
