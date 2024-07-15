import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSenatorDto } from './dto/create-senator.dto';
import { Senator, Prisma } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class SenatorService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Senator[]> {
    return this.prisma.senator.findMany();
  }

  async findById(id: number): Promise<Senator> {
    return this.prisma.senator.findUnique({ where: { id } });
  }

  async create(data: CreateSenatorDto, @Req() req: Request): Promise<Senator> {
    console.log('Cookies:', req.cookies); // Adicione esta linha para depuração
    const createdByEmail = req.cookies?.email;

    if (!createdByEmail) {
      throw new UnauthorizedException('Email not found in cookies');
    }
    
    if (req.cookies?.role !== 'admin' && req.cookies?.token) {
      throw new UnauthorizedException('Operation not authorized');
    }

    if (req.cookies?.role === 'admin'){
      return this.prisma.senator.create({
        data: {
          caucus: data.caucus,
          current: data.current,
          description: data.description,
          district: data.district,
          enddate: data.enddate ? new Date(data.enddate) : null,
          leadership_title: data.leadership_title,
          party: data.party,
          bioguideid: data.person.bioguideid,
          birthday: data.person.birthday ? new Date(data.person.birthday) : null,
          cspanid: data.person.cspanid,
          firstname: data.person.firstname,
          gender: data.person.gender,
          lastname: data.person.lastname,
          link: data.person.link,
          middlename: data.person.middlename,
          name: data.person.name,
          namemod: data.person.namemod,
          nickname: data.person.nickname,
          osid: data.person.osid,
          sortname: data.person.sortname,
          twitterid: data.person.twitterid,
          youtubeid: data.person.youtubeid,
          phone: data.phone,
          role_type: data.role_type,
          senator_class: data.senator_class,
          senator_rank: data.senator_rank,
          startdate: data.startdate ? new Date(data.startdate) : null,
          state: data.state,
          title: data.title,
          title_long: data.title_long,
          website: data.website,
          created_by: createdByEmail,
        },
      });
    }
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
