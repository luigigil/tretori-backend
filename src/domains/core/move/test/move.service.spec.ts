import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { moveArrayFixture, oneMoveFixture } from './fixtures'
import { MoveService } from '../move.service'
import { Move } from '../move.entity'

describe('MoveService', () => {
  let service: MoveService
  let repository: Repository<Move>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoveService,
        {
          provide: getRepositoryToken(Move),
          useValue: {
            find: jest.fn().mockResolvedValue(moveArrayFixture),
            findOneBy: jest.fn().mockResolvedValue(oneMoveFixture),
            save: jest.fn().mockResolvedValue(oneMoveFixture),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<MoveService>(MoveService)
    repository = module.get<Repository<Move>>(getRepositoryToken(Move))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create()', () => {
    it('should successfully insert a move', async () => {
      await expect(service.create(oneMoveFixture)).resolves.toEqual(oneMoveFixture)
    })
  })

  describe('findAll()', () => {
    it('should return an array of move', async () => {
      const physicalPersonArray = await service.findAll()
      expect(physicalPersonArray).toEqual(moveArrayFixture)
    })
  })

  describe('findOne()', () => {
    it('should get a single move', async () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy')
      await expect(service.findOne(1)).resolves.toEqual(oneMoveFixture)
      expect(repoSpy).toHaveBeenCalledWith({ id: 1 })
    })
  })

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete')
      const retVal = await service.remove(2)
      expect(removeSpy).toHaveBeenCalledWith(2)
      expect(retVal).toBeUndefined()
    })
  })
})
