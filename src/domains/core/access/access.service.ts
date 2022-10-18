import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Access } from './access.entity'
import { IAccess } from './access.types'

@Injectable()
export class AccessService {
  constructor(
    @InjectRepository(Access)
    private readonly accessRepository: Repository<Access>
  ) {}

  async findOne(id: number): Promise<Access> {
    const access = await this.accessRepository.findOne({ where: { id } })
    if (!access) {
      throw new NotFoundException('Access not found')
    }
    return access
  }

  async create(access: IAccess): Promise<Access> {
    return this.accessRepository.save(access)
  }

  async update(id: number, updateAccess: IAccess): Promise<Access> {
    const access = await this.findOne(id)
    Object.assign(access, updateAccess)
    return this.accessRepository.save(access)
  }

  async remove(id: number): Promise<void> {
    const access = await this.findOne(id)
    await this.accessRepository.remove(access)
  }
}
