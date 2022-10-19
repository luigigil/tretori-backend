import { Test, TestingModule } from '@nestjs/testing'
import { RenewController } from 'domains/core/renew/renew.controller'
import { RenewService } from 'domains/core/renew/renew.service'
import { IRenew } from 'domains/core/renew/renew.types'
import { oneRenewFixture, renewArrayFixture } from 'domains/core/renew/tests/fixtures'

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
})
