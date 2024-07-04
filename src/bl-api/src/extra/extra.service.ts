import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Extra } from '@prisma/client';
import { CreateExtraDto } from './dto/create-extra.dto';

@Injectable()
export class ExtraService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Extra[]> {
    return this.prisma.extra.findMany({
      include: {
        senator: true,
      },
    });
  }

  async create(data: Prisma.ExtraCreateInput): Promise<Extra> {
    return this.prisma.extra.create({
      data,
      include: {
        senator: true,
      },
    });
  }

  async createWithSenatorId(dto: CreateExtraDto): Promise<Extra> {
    const { senatorId, ...rest } = dto;
    return this.prisma.extra.create({
      data: {
        ...rest,
        senator: {
          connect: { id: senatorId },
        },
      },
      include: {
        senator: true,
      },
    });
  }

  async update(id: number, data: Prisma.ExtraUpdateInput): Promise<Extra> {
    return this.prisma.extra.update({
      where: { id },
      data,
      include: {
        senator: true,
      },
    });
  }

  async delete(id: number): Promise<Extra> {
    return this.prisma.extra.delete({
      where: { id },
      include: {
        senator: true,
      },
    });
  }
}
