import { Test, TestingModule } from '@nestjs/testing'
import { RepresentativeController } from 'domains/representative/representative.controller'
import { RepresentativeService } from 'domains/representative/representative.service'
import {
  CreateRepresentativeFixture,
  RepresentativeFixture,
  RepresentativeFixtureArray,
  UpdateRepresentativeFixture,
} from 'domains/representative/tests/fixtures'
import { DeleteResult } from 'typeorm'

describe('AccessController', () => {
  let controller: RepresentativeController
  let service: RepresentativeService

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
            findAll: jest
              .fn()
              .mockImplementation(() => Promise.resolve([RepresentativeFixtureArray])),
            remove: jest.fn().mockImplementation(() => Promise.resolve(DeleteResult)),
            update: jest
              .fn()
              .mockImplementation(() => Promise.resolve({ ...UpdateRepresentativeFixture })),
          },
        },
      ],
    }).compile()
    controller = app.get<RepresentativeController>(RepresentativeController)
    service = app.get<RepresentativeService>(RepresentativeService)
  })

  describe('Service is defined', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined()
    })

    it('Should be defined', () => {
      expect(service).toBeDefined()
    })
  })

  describe('Create representative', () => {
    it('Should create an representative', () => {
      expect(controller.create(CreateRepresentativeFixture)).resolves.toEqual({
        id: 1,
        ...RepresentativeFixture,
      })
    })
  })

  describe('Get Representative', () => {
    it('Should find one representative', () => {
      expect(controller.findOne(1)).resolves.toEqual(RepresentativeFixture)
    })
    it('Should get a list of all representatives', () => {
      expect(controller.findAll()).resolves.toEqual([RepresentativeFixtureArray])
    })
  })

  describe('Update representative', () => {
    it('Should update an representative', () => {
      expect(controller.update(1, RepresentativeFixture)).resolves.toEqual({
        ...UpdateRepresentativeFixture,
      })
    })
  })

  describe('Delete Representative', () => {
    it('Should delete an Representative', () => {
      expect(controller.remove(1)).resolves.toEqual(DeleteResult)
    })
  })
})
