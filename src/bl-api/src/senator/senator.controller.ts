import { Controller, Get, Post, Put, Delete, Param, Body, Req, UseGuards, NotFoundException } from '@nestjs/common';
import { SenatorService } from './senator.service';
import { Senator } from '@prisma/client';
import { CreateSenatorDto } from './dto/create-senator.dto';
import { Request } from 'express';
import { JwtAuthGuardForGet } from '../auth/jwt-auth-guard.for.get';
import { JwtAuthGuardForPutDeletePost } from '../auth/jwt-auth-guard.for.putdeletepost';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiCookieAuth } from '@nestjs/swagger';

@ApiTags('senator')
@ApiBearerAuth()
@ApiCookieAuth()
@Controller('senator')
export class SenatorController {
  constructor(private readonly senatorService: SenatorService) {}

  @ApiOperation({ summary: 'Get all senators' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @UseGuards(JwtAuthGuardForGet)
  @Get()
  async getSenators(@Req() req: Request): Promise<Senator[]> {
    return this.senatorService.findAll(req);
  }

  @ApiOperation({ summary: 'Get senator by ID' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 404, description: 'Senator not found.' })
  @UseGuards(JwtAuthGuardForGet)
  @Get(':id')
  async getSenatorById(@Param('id') id: string, @Req() req: Request): Promise<Senator> {
    const senator = await this.senatorService.findById(Number(id), req);
    if (!senator) {
      throw new NotFoundException(`Senator with ID ${id} not found`);
    }
    return senator;
  }

  @ApiOperation({ summary: 'Create a new senator' })
  @ApiResponse({ status: 201, description: 'Senator created successfully.' })
  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Post()
  async create(@Body() createSenatorDto: CreateSenatorDto, @Req() req: Request) {
    return this.senatorService.create(createSenatorDto, req);
  }

  @ApiOperation({ summary: 'Update an existing senator' })
  @ApiResponse({ status: 200, description: 'Senator updated successfully.' })
  @ApiResponse({ status: 404, description: 'Senator not found.' })
  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Put(':id')
  async updateSenator(@Param('id') id: string, @Body() data: CreateSenatorDto, @Req() req: Request): Promise<Senator> {
    return this.senatorService.update(Number(id), data, req);
  }

  @ApiOperation({ summary: 'Delete a senator by ID' })
  @ApiResponse({ status: 200, description: 'Senator deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Senator not found.' })
  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Delete(':id')
  async deleteSenator(@Param('id') id: string, @Req() req: Request): Promise<Senator> {
    return this.senatorService.delete(Number(id), req);
  }
}
