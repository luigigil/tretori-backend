import { Test, TestingModule } from '@nestjs/testing'
import { IRenew } from '../renew.types'
import { oneRenewFixture, renewArrayFixture } from './fixtures'
import { RenewController } from '../renew.controller'
import { RenewService } from '../renew.service'

describe('RenewController', () => {
  let renewController: RenewController
  let renewService: RenewService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RenewController],
      providers: [
        RenewService,
        {
          provide: RenewService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((renew: IRenew) => Promise.resolve({ id: 1, ...renew })),
            findAll: jest.fn().mockResolvedValue(renewArrayFixture),
            findOne: jest
              .fn()
              .mockImplementation((id: number) => Promise.resolve({ id, ...oneRenewFixture })),
            remove: jest.fn(),
          },
        },
      ],
    }).compile()

    renewController = app.get<RenewController>(RenewController)
    renewService = app.get<RenewService>(RenewService)
  })

  it('should be defined', () => {
    expect(renewController).toBeDefined()
  })

  describe('create()', () => {
    it('should create a renew', async () => {
      renewController.create(oneRenewFixture)
      await expect(renewController.create(oneRenewFixture)).resolves.toEqual({
        id: 1,
        ...oneRenewFixture,
      })
      expect(renewService.create).toHaveBeenCalledWith(oneRenewFixture)
    })
  })

  describe('findAll()', () => {
    it('should find all renew', () => {
      renewController.findAll()
      expect(renewService.findAll).toHaveBeenCalled()
    })
  })

  describe('findOne()', () => {
    it('should find a renew', async () => {
      await expect(renewController.findOne(3)).resolves.toEqual({
        id: 3,
        ...oneRenewFixture,
      })
      expect(renewService.findOne).toHaveBeenCalled()
    })
  })

  describe('remove()', () => {
    it('should remove the renew', () => {
      renewController.remove(2)
      expect(renewService.remove).toHaveBeenCalled()
    })
  })
})
