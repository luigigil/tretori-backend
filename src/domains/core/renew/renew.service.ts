import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Renew } from './renew.entity'
import { IRenew } from './renew.types'

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
