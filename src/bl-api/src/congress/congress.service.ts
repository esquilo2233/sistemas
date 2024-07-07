import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, CongressNumber } from '@prisma/client';
import { CreateCongressDto } from './dto/create-congress.dto';

@Injectable()
export class CongressService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<CongressNumber[]> {
    return this.prisma.congressNumber.findMany({
      include: {
        senator: true,
      },
    });
  }

  async create(data: Prisma.CongressNumberCreateInput): Promise<CongressNumber> {
    return this.prisma.congressNumber.create({
      data,
      include: {
        senator: true,
      },
    });
  }

  async createWithSenatorId(dto: CreateCongressDto): Promise<CongressNumber> {
    const { senatorId, ...rest } = dto;
    return this.prisma.congressNumber.create({
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

  async update(id: number, data: Prisma.CongressNumberUpdateInput): Promise<CongressNumber> {
    return this.prisma.congressNumber.update({
      where: { id },
      data,
      include: {
        senator: true,
      },
    });
  }

  async delete(id: number): Promise<CongressNumber> {
    return this.prisma.congressNumber.delete({
      where: { id },
      include: {
        senator: true,
      },
    });
  }
}
