import { IsNotEmpty } from 'class-validator';

export class CreateFaqDto {
  @IsNotEmpty({ message: 'Question (English) is required' })
  question_en: string;

  @IsNotEmpty({ message: 'Question (Arabic) is required' })
  question_ar: string;

  @IsNotEmpty({ message: 'Answer (English) is required' })
  answer_en: string;

  @IsNotEmpty({ message: 'Answer (Arabic) is required' })
  answer_ar: string;
}


import { PartialType } from '@nestjs/mapped-types';

export class UpdateFaqDto extends PartialType(CreateFaqDto) {}