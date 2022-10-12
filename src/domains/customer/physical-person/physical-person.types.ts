import { ApiProperty } from '@nestjs/swagger'

export class IPhysicalPerson {
  @ApiProperty()
  id?: number

  @ApiProperty()
  name: string

  @ApiProperty()
  birthdate: string

  @ApiProperty()
  cpf: string

  @ApiProperty()
  rg: string

  @ApiProperty()
  rg_emissor: string

  @ApiProperty()
  rg_emissor_uf: string
}
