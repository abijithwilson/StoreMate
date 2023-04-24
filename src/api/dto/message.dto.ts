import { ApiProperty } from '@nestjs/swagger';

export class Pagination {
  @ApiProperty()
    total: number;
}

export class MessageDto {
  @ApiProperty({ required: false })
    data: string;
  @ApiProperty({ required: false })
    message: string;
  @ApiProperty({ required: false })
    pagination: Pagination;
}
