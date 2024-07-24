import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { CongressService } from './congress.service';
import { Prisma, CongressNumber } from '@prisma/client';
import { CreateCongressDto } from './dto/create-congress.dto';
import { JwtAuthGuardForPutDeletePost } from 'src/auth/jwt-auth-guard.for.putdeletepost';
import { JwtAuthGuardForGet } from 'src/auth/jwt-auth-guard.for.get';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiCookieAuth } from '@nestjs/swagger';

@ApiTags('congress')
@ApiBearerAuth()
@ApiCookieAuth()
@Controller('congress')
export class CongressController {
  constructor(private readonly congressService: CongressService) {}

  @ApiOperation({ summary: 'Get all congress numbers' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @UseGuards(JwtAuthGuardForGet)
  @Get()
  async getCongressNumbers(): Promise<CongressNumber[]> {
    return this.congressService.findAll();
  }

  @ApiOperation({ summary: 'Get congress number by ID' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 404, description: 'Congress number not found.' })
  @UseGuards(JwtAuthGuardForGet)
  @Get(':id')
  async getCongressNumberById(@Param('id') id: string, @Req() req: Request): Promise<CongressNumber> {
    const congressNumber = await this.congressService.findById(Number(id));
    if (!congressNumber) {
      throw new NotFoundException(`Congress number with ID ${id} not found`);
    }
    return congressNumber;
  }

  @ApiOperation({ summary: 'Create a new congress number' })
  @ApiResponse({ status: 201, description: 'Congress number created successfully.' })
  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Post()
  async createCongressNumber(@Body() dto: CreateCongressDto, @Req() req): Promise<CongressNumber> {
    return this.congressService.createWithSenatorId(dto);
  }

  @ApiOperation({ summary: 'Update an existing congress number' })
  @ApiResponse({ status: 200, description: 'Congress number updated successfully.' })
  @ApiResponse({ status: 404, description: 'Congress number not found.' })
  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Put(':id')
  async updateCongressNumber(@Param('id') id: string, @Body() data: Prisma.CongressNumberUpdateInput, @Req() req): Promise<CongressNumber> {
    const updatedCongressNumber = await this.congressService.update(Number(id), data);
    if (!updatedCongressNumber) {
      throw new NotFoundException(`Congress number with ID ${id} not found`);
    }
    return updatedCongressNumber;
  }

  @ApiOperation({ summary: 'Delete a congress number by ID' })
  @ApiResponse({ status: 200, description: 'Congress number deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Congress number not found.' })
  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Delete(':id')
  async deleteCongressNumber(@Param('id') id: string, @Req() req): Promise<CongressNumber> {
    const deletedCongressNumber = await this.congressService.delete(Number(id));
    if (!deletedCongressNumber) {
      throw new NotFoundException(`Congress number with ID ${id} not found`);
    }
    return deletedCongressNumber;
  }
}
