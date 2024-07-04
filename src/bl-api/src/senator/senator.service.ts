import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Senator } from '@prisma/client';

@Injectable()
export class SenatorService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Senator[]> {
    return this.prisma.senator.findMany({
      include: {
        congressNumbers: true,
        extras: true,
      },
    });
  }

  async create(data: Prisma.SenatorCreateInput): Promise<Senator> {
    return this.prisma.senator.create({
      data,
      include: {
        congressNumbers: true,
        extras: true,
      },
    });
  }

  async update(id: number, data: Prisma.SenatorUpdateInput): Promise<Senator> {
    return this.prisma.senator.update({
      where: { id },
      data,
      include: {
        congressNumbers: true,
        extras: true,
      },
    });
  }

  async delete(id: number): Promise<Senator> {
    return this.prisma.senator.delete({
      where: { id },
      include: {
        congressNumbers: true,
        extras: true,
      },
    });
  }
}
