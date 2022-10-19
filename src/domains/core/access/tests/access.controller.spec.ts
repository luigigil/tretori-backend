import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AccessController } from 'domains/core/access/access.controller'
import { AccessService } from 'domains/core/access/access.service'
import {
  createAccessFixture,
  oneAccessFixture,
  updateAccessFixture,
} from 'domains/core/access/tests/access.fixtures'

describe('AccessController', () => {
  let accessController: AccessController
  let accessService: AccessService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AccessController],
      providers: [
        AccessService,
        {
          provide: AccessService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation(() => Promise.resolve({ id: 1, ...oneAccessFixture })),
            findOne: jest.fn().mockResolvedValueOnce({ id: 1, ...oneAccessFixture }),
            remove: jest
              .fn()
              .mockResolvedValueOnce({ id: 1, ...oneAccessFixture })
              .mockRejectedValueOnce(() => {
                throw new NotFoundException('Access Not Found')
              }),
            update: jest.fn().mockImplementation(() => Promise.resolve({ ...updateAccessFixture })),
          },
        },
      ],
    }).compile()
    accessController = app.get<AccessController>(AccessController)
    accessService = app.get<AccessService>(AccessService)
  })

  describe('Service is defined', () => {
    it('should be defined', () => {
      expect(AccessController).toBeDefined()
    })

    it('Should be defined', () => {
      expect(accessService).toBeDefined()
    })
  })

  describe('Create access', () => {
    it('Should create an access', () => {
      expect(accessController.create(createAccessFixture)).resolves.toEqual({
        id: 1,
        ...oneAccessFixture,
      })
    })
  })

  describe('FindOne access', () => {
    it('Should find one access', async () => {
      await expect(accessController.findOne(1)).resolves.toEqual(oneAccessFixture)
    })
  })

  describe('Update access', () => {
    it('Should update an access', () => {
      expect(accessController.update(1, oneAccessFixture)).resolves.toEqual({
        ...updateAccessFixture,
      })
    })
  })

  describe('Delete access', () => {
    it('Should delete an access', () => {
      expect(accessController.remove(1)).resolves.not.toThrow()
    })
  })
})
