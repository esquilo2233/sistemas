import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Extra } from '@prisma/client';
import { CreateExtraDto } from './dto/create-extra.dto';

@Injectable()
export class ExtraService {
  constructor(private prisma: PrismaService) {}

  async findAll(req: Request): Promise<Extra[]> {
    return this.prisma.extra.findMany({
      include: {
        senator: false,
      },
    });
  }

  async findById(id: number, req: Request): Promise<Extra> {
    const extra = await this.prisma.extra.findUnique({
      where: { id },
      include: {
        senator: false,
      },
    });
    if (!extra) {
      throw new NotFoundException(`Extra with ID ${id} not found`);
    }
    return extra;
  }

  async create(data: Prisma.ExtraCreateInput): Promise<Extra> {
    return this.prisma.extra.create({
      data,
      include: {
        senator: false,
      },
    });
  }

  async createWithSenatorId(dto: CreateExtraDto, req: Request): Promise<Extra> {
    const { senatorId, ...rest } = dto;
    return this.prisma.extra.create({
      data: {
        ...rest,
        senator: {
          connect: { id: senatorId },
        },
      },
      include: {
        senator: false,
      },
    });
  }

  async update(id: number, data: Prisma.ExtraUpdateInput, req: Request): Promise<Extra> {
    return this.prisma.extra.update({
      where: { id },
      data,
      include: {
        senator: false,
      },
    });
  }

  async delete(id: number, req: Request): Promise<Extra> {
    return this.prisma.extra.delete({
      where: { id },
      include: {
        senator: false,
      },
    });
  }
}
