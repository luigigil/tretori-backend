import { ApiProperty } from '@nestjs/swagger'

export class IRepresentative {
  @ApiProperty()
  id?: number
  
  @ApiProperty()
  type: string
  
  @ApiProperty()
  name: string
  
  @ApiProperty()
  role: string
  
  @ApiProperty()
  description?: string
  
  @ApiProperty()
  email: string
  
  @ApiProperty()
  phone: string
  
  @ApiProperty()
  birthdate: string
  
  @ApiProperty()
  insurance?: string
  
  @ApiProperty()
  company?: string
}
