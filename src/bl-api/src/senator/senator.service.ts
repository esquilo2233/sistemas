import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Senator, Prisma, CongressNumber, Extra } from '@prisma/client';
import { CreateSenatorDto } from './dto/create-senator.dto';

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

  async create(data: CreateSenatorDto): Promise<Senator> {
    const { congress_numbers, extra, person, ...senatorData } = data;

    const createdSenator = await this.prisma.senator.create({
      data: {
        ...senatorData,
        ...person,
      },
    });

    if (congress_numbers && congress_numbers.length > 0) {
      await Promise.all(
        congress_numbers.map((number: number) =>
          this.prisma.congressNumber.create({
            data: {
              senatorId: createdSenator.id,
              congress_number: number,
              created_by: 'system',
            },
          }),
        ),
      );
    }

    if (extra) {
      await this.prisma.extra.create({
        data: {
          senatorId: createdSenator.id,
          ...extra,
          created_by: 'system',
        },
      });
    }

    return createdSenator;
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
