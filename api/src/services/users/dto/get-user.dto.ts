import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetUserByIdentifier {
  @ApiProperty({ default: '' })
  @IsNotEmpty()
  identifier: string;
}
