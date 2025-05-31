import { IsNotEmpty, IsNumber , IsEnum, IsObject, IsOptional, IsString  } from 'class-validator';
import { ComplaintStatus } from 'entities/complaint.entity';


export class CreateComplaintDto {
  @IsString()
  message: string;

  @IsEnum(ComplaintStatus)
  @IsOptional()
  status?: ComplaintStatus;
}


export class CreateReplyDto {
  @IsNotEmpty()
  content: string;

  @IsNumber()
  complaintId: number;
}
