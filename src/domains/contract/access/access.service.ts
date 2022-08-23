import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
import { IAccess } from '../common/contract.types'
import { AccessRepository } from './access.entity'

@Injectable()
export class AccessService {
  constructor(
    @InjectRepository(AccessRepository)
    private readonly accessRepository: Repository<AccessRepository>
  ) {}

  async findOne(id: number): Promise<AccessRepository> {
    const access = this.accessRepository.findOne({ where: { id } })
    if (!access) throw new NotFoundException('Access not found')
    return access
  }

  async create(access: IAccess): Promise<AccessRepository> {
    return this.accessRepository.save(access)
  }

  async update(id: number, updateAccess: IAccess): Promise<UpdateResult> {
    const access = await this.findOne(id)
    return this.accessRepository.update(access, updateAccess)
  }

  async remove(id: number): Promise<AccessRepository> {
    const access = await this.findOne(id)
    return this.accessRepository.remove(access)
  }
}
