import { ApiProperty } from '@nestjs/swagger'
import { Contract } from '../contract/contract.entity'

export class IAccess {
  @ApiProperty()
  id?: number

  @ApiProperty()
  system: string

  @ApiProperty()
  login_tret?: string

  @ApiProperty()
  pass_tret?: string

  @ApiProperty()
  login_client: string

  @ApiProperty()
  pass_client: string
}
