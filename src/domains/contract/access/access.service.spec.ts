import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { accessFixture } from './fixtures'
import { AccessService } from './access.service'
import { Access } from './access.entity'

describe('AccessService', () => {
  let service: AccessService
  let repository: Repository<Access>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccessService,
        {
          provide: getRepositoryToken(Access),
          useValue: {
            findOne: jest.fn().mockResolvedValue(accessFixture),
            save: jest.fn().mockResolvedValue(accessFixture),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<AccessService>(AccessService)
    repository = module.get<Repository<Access>>(getRepositoryToken(Access))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create()', () => {})

  describe('findOne()', () => {
    it('should return null', async () => {
      expect(await service.findOne(1)).toEqual(accessFixture)
    })
  })
})

//   describe('create()', () => {
//     it('should successfully insert a legal person', () => {
//       expect(service.create(oneLegalPersonFixture)).resolves.toEqual(oneLegalPersonFixture)
//     })
//   })

//   describe('findAll()', () => {
//     it('should return an array of legal person', async () => {
//       const legalPersonArray = await service.findAll()
//       expect(legalPersonArray).toEqual(legalPersonArrayFixture)
//     })
//   })

//   describe('findOne()', () => {
//     it('should get a single legal person', () => {
//       const repoSpy = jest.spyOn(repository, 'findOneBy')
//       expect(service.findOne(1)).resolves.toEqual(oneLegalPersonFixture)
//       expect(repoSpy).toBeCalledWith({ id: 1 })
//     })
//   })

//   describe('remove()', () => {
//     it('should call remove with the passed value', async () => {
//       const removeSpy = jest.spyOn(repository, 'delete')
//       const retVal = await service.remove(2)
//       expect(removeSpy).toBeCalledWith(2)
//       expect(retVal).toBeUndefined()
//     })
//   })
