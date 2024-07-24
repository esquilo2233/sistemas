import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDataDto } from './dto/create-data.dto';
import { JwtAuthGuardForGet } from '../auth/jwt-auth-guard.for.get';
import { JwtAuthGuardForPutDeletePost } from '../auth/jwt-auth-guard.for.putdeletepost';
import { Request } from 'express';
import { ApiBearerAuth, ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('data')
@ApiBearerAuth()
@ApiCookieAuth()
@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @ApiOperation({ summary: 'Get all data' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @UseGuards(JwtAuthGuardForGet)
  @Get()
  async getAllData(@Req() req: Request): Promise<any[]> {
    return this.dataService.findAll();
  }

  @ApiOperation({ summary: 'Get data by ID' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 404, description: 'Data not found.' })
  @UseGuards(JwtAuthGuardForGet)
  @Get(':id')
  async getDataById(@Param('id') id: string, @Req() req: Request): Promise<any> {
    const data = await this.dataService.findById(Number(id));
    if (!data) {
      throw new NotFoundException(`Data with ID ${id} not found`);
    }
    return data;
  }

  @ApiOperation({ summary: 'Create new data' })
  @ApiResponse({ status: 201, description: 'Data created successfully.' })
  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Post()
  async createData(@Body() dto: CreateDataDto, @Req() req: Request): Promise<any> {
    const createdBy = req.cookies.email;
    return this.dataService.createData(dto, createdBy);
  }

  @ApiOperation({ summary: 'Update existing data' })
  @ApiResponse({ status: 200, description: 'Data updated successfully.' })
  @ApiResponse({ status: 404, description: 'Data not found.' })
  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Put(':id')
  async updateData(@Param('id') id: string, @Body() dto: CreateDataDto, @Req() req: Request): Promise<any> {
    return this.dataService.updateData(Number(id), dto);
  }

  @ApiOperation({ summary: 'Delete data by ID' })
  @ApiResponse({ status: 200, description: 'Data deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Data not found.' })
  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Delete(':id')
  async deleteData(@Param('id') id: string, @Req() req: Request): Promise<any> {
    return this.dataService.deleteData(Number(id));
  }
}
