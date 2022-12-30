import { IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  readonly from: string;

  @IsNotEmpty()
  readonly subject: string;

  @IsNotEmpty()
  readonly message: string;

  @IsNotEmpty()
  readonly received: string;
}
