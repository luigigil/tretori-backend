import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { genSalt, hash } from 'bcrypt'
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

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id })
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

  async update(id: number, user: IUser): Promise<User> {
    const oldUser = await this.findOne(id)
    const salt = await genSalt(12)
    const passHash = await hash(user.password, salt)

    Object.assign(oldUser, { ...user, password: passHash })
    return this.userRepository.save(oldUser)
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id)
    await this.userRepository.delete(user.id)
  }
}
