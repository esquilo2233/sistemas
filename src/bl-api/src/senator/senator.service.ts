import { Injectable, InternalServerErrorException, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSenatorDto } from './dto/create-senator.dto';
import { Senator, Prisma } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class SenatorService {
  createSenator(dto: CreateSenatorDto, createdBy: any): any {
    throw new Error('Method not implemented.');
  }
  updateSenator(arg0: number, dto: CreateSenatorDto): any {
    throw new Error('Method not implemented.');
  }
  deleteSenator(arg0: number): any {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}

  async findAll( @Req() req: Request): Promise<Senator[]> {
      return await this.prisma.senator.findMany();
  }


  async findById(id: number, @Req() req: Request): Promise<Senator> {
      const senator = await this.prisma.senator.findUnique({ 
        where: { id } 
      });
      if(!senator){
        throw new NotFoundException(`Senator with ID ${id} not found`);
      }
      return senator;
  }

  async create(data: CreateSenatorDto, @Req() req: Request): Promise<Senator> {
    const createdByEmail = req.cookies?.email
      return  await this.prisma.senator.create({
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

  async update(id: number, data: Prisma.SenatorUpdateInput, @Req() req: Request): Promise<Senator> {
    try {
        const updatedSenator = await this.prisma.senator.update({
            where: { id },
            data,
        });
        return updatedSenator;
    } catch (error) {
        console.error('Error updating senator:', error);
        throw new InternalServerErrorException('Error updating senator');
    }
  }

  async delete(id: number, @Req() req: Request): Promise<Senator> {
        const senator =  this.prisma.senator.delete({ where: { id } });
        return senator

    }
}
