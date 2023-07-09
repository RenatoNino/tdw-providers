import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  @Matches(/^(20|10|15|17)\d{9}$/)
  ruc: string;

  @IsString()
  business_name: string;

  @IsString()
  representative: string;

  @IsString()
  sector: string;

  @IsString()
  address: string;

  @IsEmail()
  email: string;
}
