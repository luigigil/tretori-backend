import { Test, TestingModule } from '@nestjs/testing'
import { IPhysicalPerson } from '../../common/customer.types'
import { onePhysicalPersonFixture, physicalPersonArrayFixture } from './fixtures'
import { PhysicalPersonController } from '../physical-person.controller'
import { PhysicalPersonService } from '../physical-person.service'
import { NotFoundException } from '@nestjs/common'

describe('PhysicalPersonController', () => {
  let physicalPersonController: PhysicalPersonController
  let physicalPersonService: PhysicalPersonService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PhysicalPersonController],
      providers: [
        PhysicalPersonService,
        {
          provide: PhysicalPersonService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((physicalPerson: IPhysicalPerson) =>
                Promise.resolve({ id: 1, ...physicalPerson })
              ),
            findAll: jest.fn().mockResolvedValue(physicalPersonArrayFixture),
            findOne: jest
              .fn()
              .mockImplementation((id: number) =>
                Promise.resolve({ id, ...onePhysicalPersonFixture })
              ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile()

    physicalPersonController = app.get<PhysicalPersonController>(PhysicalPersonController)
    physicalPersonService = app.get<PhysicalPersonService>(PhysicalPersonService)
  })

  it('should be defined', () => {
    expect(physicalPersonController).toBeDefined()
  })

  describe('create()', () => {
    it('should create a physical person', async () => {
      physicalPersonController.create(onePhysicalPersonFixture)
      await expect(physicalPersonController.create(onePhysicalPersonFixture)).resolves.toEqual({
        id: 1,
        ...onePhysicalPersonFixture,
      })
      expect(physicalPersonService.create).toHaveBeenCalledWith(onePhysicalPersonFixture)
    })
  })

  describe('findAll()', () => {
    it('should find all physical person', () => {
      physicalPersonController.findAll()
      expect(physicalPersonService.findAll).toHaveBeenCalled()
    })
  })

  describe('findOne()', () => {
    it('should find a physical person', async () => {
      await expect(physicalPersonController.findOne(3)).resolves.toEqual({
        id: 3,
        ...onePhysicalPersonFixture,
      })
      expect(physicalPersonService.findOne).toHaveBeenCalled()
    })
  })

  describe('remove()', () => {
    it('should remove the physical person', () => {
      expect(physicalPersonController.remove(1)).not.toThrow()
      expect(physicalPersonService.remove).toHaveBeenCalled()
    })
    it('should throw new not found exception', async () => {
      jest
        .spyOn(physicalPersonService, 'findOne')
        .mockRejectedValueOnce(new NotFoundException('Legal Person not found'))
      physicalPersonController.remove(10)
      await expect(physicalPersonController.remove(10)).rejects.toThrow(
        new NotFoundException('Legal person not found')
      )
    })
  })
})
