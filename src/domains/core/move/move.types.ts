import { ApiProperty } from '@nestjs/swagger'

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
  contract?: string
}
