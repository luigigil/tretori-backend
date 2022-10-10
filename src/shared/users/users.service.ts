/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { IUser } from './user.types'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  findOneByUsername(username: string): Promise<User> {
    const user = this.userRepository.findOneBy({ username })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  findOne(id: number): Promise<User> {
    const user = this.userRepository.findOneBy({ id })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  create(user: IUser): Promise<User> {
    return this.userRepository.save(user)
  }

  async update(id: number, user: IUser): Promise<void> {
    const oldUser = await this.findOne(id)
    await this.userRepository.update(oldUser, user)
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id)
    try {
      await this.userRepository.remove(user)
    } catch (e) {
      throw new NotFoundException('Error removing User')
    }
  }
}
