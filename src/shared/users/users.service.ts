/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { IUser } from './user.types'
import { genSalt, hash } from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username })
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

  async create(user: IUser): Promise<User> {
    const salt = await genSalt(12)
    const passHash = await hash(user.password, salt)
    return this.userRepository.save({ ...user, password: passHash })
  }

  async update(id: number, user: IUser): Promise<void> {
    const oldUser = await this.findOne(id)
    const salt = await genSalt(12)
    const passHash = await hash(user.password, salt)
    await this.userRepository.update(oldUser, { ...user, password: passHash })
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
