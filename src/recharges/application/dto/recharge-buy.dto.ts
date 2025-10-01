import { IsNumber, IsString, Min, Max, Matches, Length } from 'class-validator';

export class RechargeBuyDto {
  @IsNumber()
  @Min(1000)
  @Max(100000)
  amount: number;

  @IsString()
  @Length(10, 10)
  @Matches(/^3\d{9}$/, { message: 'Phone number must start with 3 and contain only digits' })
  phoneNumber: string;
}