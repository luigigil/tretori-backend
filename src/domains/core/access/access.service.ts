import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
import { IAccess } from './access.types'
import { Access } from './access.entity'

@Injectable()
export class AccessService {
  constructor(
    @InjectRepository(Access)
    private readonly accessRepository: Repository<Access>
  ) {}

  async findOne(id: number): Promise<Access> {
    const access = this.accessRepository.findOne({ where: { id } })
    if (!access) {
      throw new NotFoundException('Access not found')
    }
    return access
  }

  async create(access: IAccess): Promise<Access> {
    return this.accessRepository.save(access)
  }

  async update(id: number, updateAccess: IAccess): Promise<UpdateResult> {
    const access = await this.findOne(id)
    return this.accessRepository.update(access, updateAccess)
  }

  async remove(id: number): Promise<void> {
    const access = await this.findOne(id)
    try {
      await this.accessRepository.remove(access)
    } catch (e) {
      throw new NotFoundException(`Error removing access: ${e.message}`)
    }
  }
}
