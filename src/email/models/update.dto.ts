import { IsNotEmpty } from 'class-validator';

export class UpdateDto {
  @IsNotEmpty()
  readonly read: boolean;
  readonly starred: boolean;
}
