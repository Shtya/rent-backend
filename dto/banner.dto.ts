import {
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  IsDate,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class LocalizedTitle {
  @IsOptional()
  @IsString()
  ar?: string;

  @IsOptional()
  @IsString()
  en?: string;
}

export class CreateBannerDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTitle)
  title?: LocalizedTitle;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsUrl()
  link: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  start_date?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  end_date?: Date;
}
