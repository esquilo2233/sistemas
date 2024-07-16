import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDataDto } from './dto/create-data.dto';
import { JwtAuthGuardForGet } from '../auth/jwt-auth-guard.for.get';
import { JwtAuthGuardForPutDeletePost } from '../auth/jwt-auth-guard.for.putdeletepost';
import { Request } from 'express';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @UseGuards(JwtAuthGuardForGet)
  @Get()
  async getAllData(@Req() req: Request): Promise<any[]> {
    return this.dataService.findAll();
  }

  @UseGuards(JwtAuthGuardForGet)
  @Get(':id')
  async getDataById(@Param('id') id: string, @Req() req: Request): Promise<any> {
    const data = await this.dataService.findById(Number(id));
    if (!data) {
      throw new NotFoundException(`Data with ID ${id} not found`);
    }
    return data;
  }

  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Post()
  async createData(@Body() dto: CreateDataDto, @Req() req: Request): Promise<any> {
    const createdBy = req.cookies.email;
    return this.dataService.createData(dto, createdBy);
  }

  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Put(':id')
  async updateData(@Param('id') id: string, @Body() dto: CreateDataDto, @Req() req: Request): Promise<any> {
    return this.dataService.updateData(Number(id), dto);
  }
  @UseGuards(JwtAuthGuardForPutDeletePost)
  @Delete(':id')
  async deleteData(@Param('id') id: string, @Req() req: Request): Promise<any> {
    return this.dataService.deleteData(Number(id));
  }
}
