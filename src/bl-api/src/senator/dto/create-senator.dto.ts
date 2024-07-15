import {
  IsString, IsBoolean, IsOptional, IsDate, IsInt, ValidateNested, IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class PersonDto {
  @IsOptional()
  @IsString()
  bioguideid?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthday?: Date;

  @IsOptional()
  @IsInt()
  cspanid?: number;

  @IsOptional()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  lastname?: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsString()
  middlename?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  namemod?: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsString()
  osid?: string;

  @IsOptional()
  @IsString()
  sortname?: string;

  @IsOptional()
  @IsString()
  twitterid?: string;

  @IsOptional()
  @IsString()
  youtubeid?: string;
}

export class CreateSenatorDto {
  @IsOptional()
  @IsString()
  caucus?: string;

  @IsOptional()
  @IsBoolean()
  current?: boolean;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  enddate?: Date;

  @IsOptional()
  @IsString()
  leadership_title?: string;

  @IsOptional()
  @IsString()
  party?: string;

  @ValidateNested()
  @Type(() => PersonDto)
  person: PersonDto;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  role_type?: string;

  @IsOptional()
  @IsString()
  senator_class?: string;

  @IsOptional()
  @IsString()
  senator_rank?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startdate?: Date;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  title_long?: string;

  @IsOptional()
  @IsString()
  website?: string;
}
