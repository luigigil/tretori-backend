import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IContract } from './contract.types'
import { Contract } from './contract.entity'

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>
  ) {}

  findAll(): Promise<Contract[]> {
    return this.contractRepository.find({})
  }

  async findOne(id: number): Promise<Contract> {
    const contract = await this.contractRepository.findOne({
      where: { id },
      relations: {
        physical_person: true,
        legal_person: true,
        renew: true,
        move: true,
      },
    })
    if (!contract) {
      throw new NotFoundException(`Contract not found`)
    }
    return contract
  }

  create(contract: IContract): Promise<Contract> {
    return this.contractRepository.save(contract)
  }

  async update(id: number, contract: IContract): Promise<void> {
    await this.contractRepository.update(id, contract)
  }

  async remove(id: number): Promise<void> {
    const contract = await this.findOne(id)
    try {
      await this.contractRepository.remove(contract)
    } catch (e) {
      throw new NotFoundException(`Error removing contract`)
    }
  }
}
