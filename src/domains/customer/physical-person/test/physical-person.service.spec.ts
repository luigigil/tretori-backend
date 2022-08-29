import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { physicalPersonArrayFixture, onePhysicalPersonFixture } from './fixtures'
import { PhysicalPersonService } from '../physical-person.service'
import { PhysicalPerson } from '../physical-person.entity'

describe('PhysicalPersonService', () => {
  let service: PhysicalPersonService
  let repository: Repository<PhysicalPerson>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhysicalPersonService,
        {
          provide: getRepositoryToken(PhysicalPerson),
          useValue: {
            find: jest.fn().mockResolvedValue(physicalPersonArrayFixture),
            findOneBy: jest.fn().mockResolvedValue(onePhysicalPersonFixture),
            save: jest.fn().mockResolvedValue(onePhysicalPersonFixture),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<PhysicalPersonService>(PhysicalPersonService)
    repository = module.get<Repository<PhysicalPerson>>(getRepositoryToken(PhysicalPerson))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create()', () => {
    it('should successfully insert a physical person', () => {
      expect(service.create(onePhysicalPersonFixture)).resolves.toEqual(onePhysicalPersonFixture)
    })
  })

  describe('findAll()', () => {
    it('should return an array of physical person', async () => {
      const physicalPersonArray = await service.findAll()
      expect(physicalPersonArray).toEqual(physicalPersonArrayFixture)
    })
  })

  describe('findOne()', () => {
    it('should get a single physical person', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy')
      expect(service.findOne(1)).resolves.toEqual(onePhysicalPersonFixture)
      expect(repoSpy).toBeCalledWith({ id: 1 })
    })
  })

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete')
      const retVal = await service.remove(2)
      expect(removeSpy).toBeCalledWith(2)
      expect(retVal).toBeUndefined()
    })
  })
})
