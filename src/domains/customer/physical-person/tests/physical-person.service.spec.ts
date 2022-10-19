import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { PhysicalPerson } from '~/domains/customer/physical-person/physical-person.entity'
import { PhysicalPersonService } from '~/domains/customer/physical-person/physical-person.service'
import {
  onePhysicalPersonFixture,
  physicalPersonArrayFixture,
} from '~/domains/customer/physical-person/tests/fixtures'
import { Repository } from 'typeorm'

describe('PhysicalPersonService', () => {
  let physicalPersonService: PhysicalPersonService
  let physicalPersonRepository: Repository<PhysicalPerson>

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

    physicalPersonService = module.get<PhysicalPersonService>(PhysicalPersonService)
    physicalPersonRepository = module.get<Repository<PhysicalPerson>>(
      getRepositoryToken(PhysicalPerson)
    )
  })

  it('should be defined', () => {
    expect(physicalPersonService).toBeDefined()
  })

  describe('create()', () => {
    it('should successfully insert a physical person', async () => {
      await expect(physicalPersonService.create(onePhysicalPersonFixture)).resolves.toEqual(
        onePhysicalPersonFixture
      )
    })
  })

  describe('findAll()', () => {
    it('should return an array of physical person', async () => {
      const physicalPersonArray = await physicalPersonService.findAll()
      expect(physicalPersonArray).toEqual(physicalPersonArrayFixture)
    })
  })

  describe('findOne()', () => {
    it('should get a single physical person', async () => {
      const repoSpy = jest.spyOn(physicalPersonRepository, 'findOneBy')
      await expect(physicalPersonService.findOne(1)).resolves.toEqual(onePhysicalPersonFixture)
      expect(repoSpy).toHaveBeenCalledWith({ id: 1 })
    })

    it('should throw an error if physical person is not found', async () => {
      jest.spyOn(physicalPersonRepository, 'findOneBy').mockResolvedValue(null)
      await expect(physicalPersonService.findOne(1)).rejects.toThrow(NotFoundException)
    })
  })

  describe('update()', () => {
    it('should update a physical person', async () => {
      jest
        .spyOn(physicalPersonService, 'findOne')
        .mockResolvedValue(onePhysicalPersonFixture as PhysicalPerson)
      await expect(
        physicalPersonService.update(onePhysicalPersonFixture.id, onePhysicalPersonFixture)
      ).resolves.toEqual(onePhysicalPersonFixture)
    })
  })

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      await expect(physicalPersonService.remove(2)).resolves.not.toThrow()
      const removeSpy = jest.spyOn(physicalPersonRepository, 'remove')
      await physicalPersonService.remove(3)
      expect(removeSpy).toHaveBeenCalled()
    })
    it('Should throw a new not found exception', async () => {
      jest
        .spyOn(physicalPersonService, 'findOne')
        .mockRejectedValueOnce(new NotFoundException('Legal Person not found'))
      await expect(physicalPersonService.remove(123)).rejects.toThrow(
        new NotFoundException('Legal Person not found')
      )
    })
  })
})
