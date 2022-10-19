import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { PhysicalPersonController } from 'domains/customer/physical-person/physical-person.controller'
import { PhysicalPersonService } from 'domains/customer/physical-person/physical-person.service'
import { IPhysicalPerson } from 'domains/customer/physical-person/physical-person.types'
import {
  onePhysicalPersonFixture,
  physicalPersonArrayFixture,
} from 'domains/customer/physical-person/tests/fixtures'

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
            remove: jest
              .fn()
              .mockResolvedValueOnce(() => {
                Promise.resolve()
              })
              .mockRejectedValueOnce(() => {
                throw new NotFoundException('Physical person not found')
              }),
            update: jest.fn(),
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

  describe('update()', () => {
    it('should update an physical person', async () => {
      jest
        .spyOn(physicalPersonService, 'update')
        .mockResolvedValue(onePhysicalPersonFixture as IPhysicalPerson)
      await expect(
        physicalPersonController.update(onePhysicalPersonFixture.id, onePhysicalPersonFixture)
      ).resolves.toEqual(onePhysicalPersonFixture)
    })
  })

  describe('remove()', () => {
    it('should remove the physical person', async () => {
      await expect(physicalPersonController.remove(1)).resolves.not.toThrow()
    })
    it('should throw new not found exception', async () => {
      physicalPersonController.remove(1)
      await expect(physicalPersonController.remove(10)).rejects.toThrow(
        new NotFoundException('Physical person not found')
      )
    })
  })
})
