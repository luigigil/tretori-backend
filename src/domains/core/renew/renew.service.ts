import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Renew } from 'domains/core/renew/renew.entity'
import { IRenew } from 'domains/core/renew/renew.types'
import { Repository } from 'typeorm'

@Injectable()
export class RenewService {
  constructor(
    @InjectRepository(Renew)
    private readonly renewRepository: Repository<Renew>
  ) {}

  findAll(): Promise<Renew[]> {
    return this.renewRepository.find()
  }

  create(renew: IRenew): Promise<Renew> {
    return this.renewRepository.save(renew)
  }
}
