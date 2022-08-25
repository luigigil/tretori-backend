import { Test, TestingModule } from '@nestjs/testing'
import { RepresentativeService } from './representative.service'
import { RepresentativeController } from './representative.controller'
import {
  CreateRepresentativeFixture,
  RepresentativeFixture,
  UpdateRepresentativeFixture,
} from './fixtures/representative.fixtures'
import { DeleteResult } from 'typeorm'

describe('AccessController', () => {
  let representativeController: RepresentativeController
  let representativeService: RepresentativeService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RepresentativeController],
      providers: [
        RepresentativeService,
        {
          provide: RepresentativeService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation(() => Promise.resolve({ id: 1, ...RepresentativeFixture })),
            findOne: jest
              .fn()
              .mockImplementation((id: number) =>
                Promise.resolve({ id, ...RepresentativeFixture })
              ),
            remove: jest.fn().mockImplementation(() => Promise.resolve(DeleteResult)),
            update: jest
              .fn()
              .mockImplementation(() => Promise.resolve({ ...UpdateRepresentativeFixture })),
          },
        },
      ],
    }).compile()
    representativeController = app.get<RepresentativeController>(RepresentativeController)
    representativeService = app.get<RepresentativeService>(RepresentativeService)
  })

  describe('Service is defined', () => {
    it('should be defined', () => {
      expect(representativeController).toBeDefined()
    })

    it('Should be defined', () => {
      expect(representativeService).toBeDefined()
    })
  })

  describe('Create representative', () => {
    it('Should create an representative', () => {
      expect(representativeController.create(CreateRepresentativeFixture)).resolves.toEqual({
        id: 1,
        ...RepresentativeFixture,
      })
    })
  })

  describe('FindOne Representative', () => {
    it('Should find one access', () => {
      expect(representativeController.findOne(1)).resolves.toEqual(RepresentativeFixture)
    })
  })

  describe('Update representative', () => {
    it('Should update an representative', () => {
      expect(representativeController.update(1, RepresentativeFixture)).resolves.toEqual({
        ...UpdateRepresentativeFixture,
      })
    })
  })

  describe('Delete Representative', () => {
    it('Should delete an Representative', () => {
      expect(representativeController.remove(1)).resolves.toEqual(DeleteResult)
    })
  })
})
