import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Access } from '../access/access.entity'
import { AccessService } from '../access/access.service'
import { Contract } from './contract.entity'
import { IContract, IContractUpdate } from './contract.types'

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
    private readonly accessService: AccessService
  ) {}

  findAll(): Promise<Contract[]> {
    return this.contractRepository.find({})
  }

  async findOne(id: number): Promise<Contract> {
    const contract = await this.contractRepository.findOne({
      where: { id },
      relations: {
        customer: true,
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

  async update(
    id: number,
    { contract: contractToUpdate, access: accessToUpdate }: IContractUpdate
  ): Promise<void> {
    const contract = await this.findOne(id)

    if (!contract.access) {
      contract.access = new Access()
    }

    Object.assign(contract.access, accessToUpdate)
    Object.assign(contract, contractToUpdate)

    await this.contractRepository.save(contract)
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
