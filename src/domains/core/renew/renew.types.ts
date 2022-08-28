import { ApiProperty } from '@nestjs/swagger'

export class IRenew {
  @ApiProperty()
  id?: number

  @ApiProperty()
  proposed_date: string

  @ApiProperty()
  proposed_adjustment: string

  @ApiProperty()
  closed_date: string

  @ApiProperty()
  closed_value: string

  @ApiProperty()
  details: string

  @ApiProperty()
  contract?: string
}
