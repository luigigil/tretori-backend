import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Access } from 'domains/core/access/access.entity'
import { Contract } from 'domains/core/contract/contract.entity'
import {
  IContract,
  IContractUpdate,
  IMoveResponse,
  IRenewResponse,
} from 'domains/core/contract/contract.types'
import { Move } from 'domains/core/move/move.entity'
import { IMove } from 'domains/core/move/move.types'
import { Renew } from 'domains/core/renew/renew.entity'
import { IRenew } from 'domains/core/renew/renew.types'
import { Repository } from 'typeorm'

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
  ): Promise<Contract> {
    const contract = await this.findOne(id)

    if (!contract.access) {
      contract.access = new Access()
    }

    Object.assign(contract.access, accessToUpdate)
    Object.assign(contract, contractToUpdate)

    return await this.contractRepository.save(contract)
  }

  async remove(id: number): Promise<void> {
    const contract = await this.findOne(id)
    try {
      await this.contractRepository.remove(contract)
    } catch (e) {
      throw new NotFoundException(`Error removing contract`)
    }
  }

  async moveContract(id: number, move: IMove): Promise<IMoveResponse> {
    const oldContract = await this.findOne(id)
    oldContract.move.push(move as Move)
    const newContract = await this.contractRepository.save(oldContract)
    return {
      move,
      contract: newContract,
    }
  }

  async renewContract(id: number, renew: IRenew): Promise<IRenewResponse> {
    const oldContract = await this.findOne(id)
    oldContract.renew.push(renew as Renew)
    const newContract = await this.contractRepository.save(oldContract)
    return {
      renew,
      contract: newContract,
    }
  }
}
