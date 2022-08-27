import { ApiProperty } from '@nestjs/swagger'

export class IProduct {
  @ApiProperty()
  id?: number

  @ApiProperty()
  name: string

  @ApiProperty()
  type: string

  @ApiProperty()
  plan: string

  @ApiProperty()
  size: string
}
