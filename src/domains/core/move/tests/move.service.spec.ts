import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Move } from '~/domains/core/move/move.entity'
import { MoveService } from '~/domains/core/move/move.service'
import { moveArrayFixture, oneMoveFixture } from '~/domains/core/move/tests/fixtures'

describe('MoveService', () => {
  let service: MoveService

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
})
