import { ApiProperty } from '@nestjs/swagger'

export class IUser {
  @ApiProperty()
  id?: number

  @ApiProperty()
  username: string

  @ApiProperty()
  password: string

  @ApiProperty()
  roles: string
}
