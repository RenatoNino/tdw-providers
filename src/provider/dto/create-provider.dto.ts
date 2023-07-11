import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  @Matches(/^(20|10|15|17)\d{9}$/, {
    message: 'El Ruc debe ser del formato correcto.',
  })
  ruc: string;

  @IsString()
  @Length(1, 255, { message: 'La Razón Social es obligatoria.' })
  business_name: string;

  @IsString()
  @Length(1, 255, { message: 'El Representante es obligatorio.' })
  representative: string;

  @IsString()
  @Length(1, 255, { message: 'El Rubro es obligatorio.' })
  sector: string;

  @IsString()
  @Length(1, 255, { message: 'El Dirección es obligatoria.' })
  address: string;

  @IsEmail()
  @Length(1, 255, { message: 'El Email es obligatorio.' })
  email: string;
}
