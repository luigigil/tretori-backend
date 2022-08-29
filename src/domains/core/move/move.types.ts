import { ApiProperty } from '@nestjs/swagger'
import { Contract } from '../contract/contract.entity'

export class IMove {
  @ApiProperty()
  id?: number

  @ApiProperty()
  move_date: string

  @ApiProperty()
  action: string

  @ApiProperty()
  number_of_lives: number

  @ApiProperty()
  description: string

  @ApiProperty()
  details: string

  @ApiProperty()
  contract?: Contract
}
