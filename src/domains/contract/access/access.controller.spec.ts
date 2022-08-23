import { Test, TestingModule } from '@nestjs/testing'
import { AccessService } from './access.service'
import { AccessController } from './access.controller'
import { accessFixture, createAcessFixture, updateAcessFixture } from './fixtures'
import { DeleteResult } from 'typeorm'
import { UploadedFile } from '@nestjs/common'

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
              .mockImplementation(() => Promise.resolve({ id: 1, ...accessFixture })),
            findOne: jest
              .fn()
              .mockImplementation((id: number) => Promise.resolve({ id, ...accessFixture })),
            remove: jest.fn().mockImplementation(() => Promise.resolve(DeleteResult)),
            update: jest.fn().mockImplementation(() => Promise.resolve({ ...updateAcessFixture })),
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
      expect(accessController.create(createAcessFixture)).resolves.toEqual({
        id: 1,
        ...accessFixture,
      })
    })
  })

  describe('FindOne access', () => {
    it('Should find one access', () => {
      expect(accessController.findOne(1)).resolves.toEqual(accessFixture)
    })
  })

  describe('Update access', () => {
    it('Should update an access', () => {
      expect(accessController.update(1, accessFixture)).resolves.toEqual({
        ...updateAcessFixture,
      })
    })
  })

  describe('Delete access', () => {
    it('Should delete an access', () => {
      expect(accessController.remove(1)).resolves.toEqual(DeleteResult)
    })
  })
})
