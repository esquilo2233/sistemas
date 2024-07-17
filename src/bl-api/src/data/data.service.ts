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
          caucus: senatorData.caucus,
          current: senatorData.current,
          description: senatorData.description,
          district: senatorData.district,
          enddate: senatorData.enddate ? new Date(senatorData.enddate) : null,
          leadership_title: senatorData.leadership_title,
          party: senatorData.party,
          bioguideid: person.bioguideid,
          birthday: person.birthday ? new Date(person.birthday) : null,
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
          phone: senatorData.phone,
          role_type: senatorData.role_type,
          senator_class: senatorData.senator_class,
          senator_rank: senatorData.senator_rank,
          startdate: senatorData.startdate ? new Date(senatorData.startdate) : null,
          state: senatorData.state,
          title: senatorData.title,
          title_long: senatorData.title_long,
          website: senatorData.website,
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
          caucus: senatorData.caucus,
          current: senatorData.current,
          description: senatorData.description,
          district: senatorData.district,
          enddate: senatorData.enddate ? new Date(senatorData.enddate) : null,
          leadership_title: senatorData.leadership_title,
          party: senatorData.party,
          bioguideid: person.bioguideid,
          birthday: person.birthday ? new Date(person.birthday) : null,
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
          phone: senatorData.phone,
          role_type: senatorData.role_type,
          senator_class: senatorData.senator_class,
          senator_rank: senatorData.senator_rank,
          startdate: senatorData.startdate ? new Date(senatorData.startdate) : null,
          state: senatorData.state,
          title: senatorData.title,
          title_long: senatorData.title_long,
          website: senatorData.website,
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
