import { IsArray, IsBoolean, IsDate, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class PersonDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bioguideid?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthday?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  cspanid?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  firstname?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  link?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  middlename?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  namemod?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  osid?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sortname?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  twitterid?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  youtubeid?: string;
}

class ExtraDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contact_form?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  office?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  rss_url?: string;
}

export class CreateDataDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  caucus?: string;

  @ApiProperty({ required: true, type: [Number] })
  @IsArray()
  @IsInt({ each: true })
  congress_numbers: number[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  current?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  enddate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  leadership_title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  party?: string;

  @ApiProperty({ required: true })
  @ValidateNested()
  @Type(() => PersonDto)
  person: PersonDto;

  @ApiProperty({ required: true })
  @ValidateNested()
  @Type(() => ExtraDto)
  extra: ExtraDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  role_type?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  senator_class?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  senator_rank?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startdate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title_long?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  website?: string;
}
