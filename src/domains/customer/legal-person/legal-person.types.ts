import { ApiProperty } from '@nestjs/swagger'

export class ILegalPerson {
  @ApiProperty()
  id?: number

  @ApiProperty()
  fantasy_name: string

  @ApiProperty()
  cnpj: string

  @ApiProperty()
  social_reason: string

  @ApiProperty()
  type: string

  @ApiProperty()
  size: string

  @ApiProperty()
  representatives?: string
}
