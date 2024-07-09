import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSenatorDto } from './dto/create-senator.dto';
import { Senator, Prisma } from '@prisma/client';

@Injectable()
export class SenatorService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Senator[]> {
    return this.prisma.senator.findMany();
  }

  async findById(id: number): Promise<Senator> {
    return this.prisma.senator.findUnique({ where: { id } });
  }

  async create(data: CreateSenatorDto): Promise<Senator> {
    return this.prisma.senator.create({ data });
  }

  async update(id: number, data: Prisma.SenatorUpdateInput): Promise<Senator> {
    return this.prisma.senator.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Senator> {
    return this.prisma.senator.delete({
      where: { id },
    });
  }
}
