import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
import { IAccess } from '../common/contract.types'
import { Access } from './access.entity'

@Injectable()
export class AccessService {
  constructor(
    @InjectRepository(Access)
    private readonly accessRepository: Repository<Access>
  ) {}

  findAll(): Promise<Access[]> {
    return this.accessRepository.find()
  }

  findOne(id: number): Promise<Access> {
    return this.accessRepository.findOneBy({ id })
  }

  create(Access: IAccess): Promise<Access> {
    return this.accessRepository.save(Access)
  }

  async update(id: number, Access: IAccess): Promise<UpdateResult> {
    let access = await this.accessRepository.update(id, Access)
    if(!access) throw new NotFoundException('Access not found')
    return access
  }

  async remove(id: number): Promise<void> {
    await this.accessRepository.delete(id)
  }
}
