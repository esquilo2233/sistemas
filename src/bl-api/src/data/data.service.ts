import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDataDto } from './dto/create-data.dto';

@Injectable()
export class DataService {
  constructor(private prisma: PrismaService) {}

  async createData(dto: CreateDataDto, createdBy: string): Promise<any> {
    return this.prisma.$transaction(async (prisma) => {
      const { congress_numbers, extra, person, ...senatorData } = dto;

      const senator = await prisma.senator.create({
        data: {
          ...senatorData,
          bioguideid: person.bioguideid,
          birthday: person.birthday,
          cspanid: person.cspanid,
          firstname: person.firstname,
          gender: person.gender,
          lastname: person.lastname,
          link: person.link,
          middlename: person.middlename,
          name: person.name,
          namemod: person.namemod,
          nickname: person.nickname,
          osid: person.osid,
          sortname: person.sortname,
          twitterid: person.twitterid,
          youtubeid: person.youtubeid,
          created_by: createdBy,
        },
      });

      const congressPromises = congress_numbers.map((number) =>
        prisma.congressNumber.create({
          data: {
            senatorId: senator.id,
            congress_number: number,
            created_by: createdBy,
          },
        }),
      );

      const extraData = await prisma.extra.create({
        data: {
          ...extra,
          senatorId: senator.id,
          created_by: createdBy,
        },
      });

      await Promise.all(congressPromises);

      return {
        ...senator,
        congress_numbers,
        extra: extraData,
      };
    });
  }

  async updateData(id: number, dto: CreateDataDto): Promise<any> {
    return this.prisma.$transaction(async (prisma) => {
      const { congress_numbers, extra, person, ...senatorData } = dto;

      const senator = await prisma.senator.update({
        where: { id },
        data: {
          ...senatorData,
          bioguideid: person.bioguideid,
          birthday: person.birthday ? new Date(person.birthday) : undefined,
          cspanid: person.cspanid,
          firstname: person.firstname,
          gender: person.gender,
          lastname: person.lastname,
          link: person.link,
          middlename: person.middlename,
          name: person.name,
          namemod: person.namemod,
          nickname: person.nickname,
          osid: person.osid,
          sortname: person.sortname,
          twitterid: person.twitterid,
          youtubeid: person.youtubeid,
        },
      });

      await prisma.congressNumber.deleteMany({ where: { senatorId: id } });
      const congressPromises = congress_numbers.map((number) =>
        prisma.congressNumber.create({
          data: {
            senatorId: senator.id,
            congress_number: number,
          },
        }),
      );

      const extraRecord = await prisma.extra.findFirst({
        where: { senatorId: id },
        select: { id: true },
      });

      if (!extraRecord) {
        throw new NotFoundException(`Extra record not found for senator ID ${id}`);
      }

      const extraData = await prisma.extra.update({
        where: { id: extraRecord.id },
        data: {
          address: extra.address,
          contact_form: extra.contact_form,
          office: extra.office,
          rss_url: extra.rss_url,
        },
      });

      await Promise.all(congressPromises);

      return {
        ...senator,
        congress_numbers,
        extra: extraData,
      };
    });
  }

  async deleteData(id: number): Promise<any> {
    return this.prisma.$transaction(async (prisma) => {
      const extraData = await prisma.extra.deleteMany({ where: { senatorId: id } });
      const congressData = await prisma.congressNumber.deleteMany({ where: { senatorId: id } });
      const senator = await prisma.senator.delete({ where: { id } });

      return {
        ...senator,
        congress_numbers: congressData,
        extra: extraData,
      };
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.senator.findMany({
      include: {
        congressNumbers: true,
        extras: true,
      },
    });
  }

  async findById(id: number): Promise<any> {
    const senator = await this.prisma.senator.findUnique({
      where: { id },
      include: {
        congressNumbers: true,
        extras: true,
      },
    });
    if (!senator) {
      throw new NotFoundException(`Data with ID ${id} not found`);
    }
    return senator;
  }
}
