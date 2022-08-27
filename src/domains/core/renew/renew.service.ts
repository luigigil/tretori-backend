import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IRenew } from './renew.types'
import { Renew } from './renew.entity'

@Injectable()
export class RenewService {
  constructor(
    @InjectRepository(Renew)
    private readonly renewRepository: Repository<Renew>
  ) {}

  findAll(): Promise<Renew[]> {
    return this.renewRepository.find()
  }

  findOne(id: number): Promise<Renew> {
    return this.renewRepository.findOneBy({ id })
  }

  create(renew: IRenew): Promise<Renew> {
    return this.renewRepository.save(renew)
  }

  async update(id: number, renew: IRenew): Promise<void> {
    await this.renewRepository.update(id, renew)
  }

  async remove(id: number): Promise<void> {
    await this.renewRepository.delete(id)
  }
}
