import { Test, TestingModule } from '@nestjs/testing'
import { IAccess } from '../common/contract.types'
import { AccessService } from './access.service'
import { AccessController } from './access.controller'
import { accessFixture } from './fixtures'
import { DeleteResult } from 'typeorm'

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
          },
        },
      ],
    }).compile()
    accessController = app.get<AccessController>(AccessController)
    accessService = app.get<AccessService>(AccessService)
  })

  it('should be defined', () => {
    expect(AccessController).toBeDefined()
  })

  it('Should be defined', () => {
    expect(accessService).toBeDefined()
  })
})
//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [LegalPersonController],
//       providers: [
//         LegalPersonService,
//         {
//           provide: LegalPersonService,
//           useValue: {
//             create: jest
//               .fn()
//               .mockImplementation((legalPerson: ILegalPerson) =>
//                 Promise.resolve({ id: 1, ...legalPerson })
//               ),
//             findAll: jest.fn().mockResolvedValue(legalPersonArrayFixture),
//             findOne: jest
//               .fn()
//               .mockImplementation((id: number) =>
//                 Promise.resolve({ id, ...oneLegalPersonFixture })
//               ),
//             remove: jest.fn(),
//           },
//         },
//       ],
//     }).compile()

//     legalPersonController = app.get<LegalPersonController>(LegalPersonController)
//     legalPersonService = app.get<LegalPersonService>(LegalPersonService)
//   })

//   it('should be defined', () => {
//     expect(legalPersonController).toBeDefined()
//   })

//   describe('create()', () => {
//     it('should create a legal person', () => {
//       legalPersonController.create(oneLegalPersonFixture)
//       expect(legalPersonController.create(oneLegalPersonFixture)).resolves.toEqual({
//         id: 1,
//         ...oneLegalPersonFixture,
//       })
//       expect(legalPersonService.create).toHaveBeenCalledWith(oneLegalPersonFixture)
//     })
//   })

//   describe('findAll()', () => {
//     it('should find all legal person ', () => {
//       legalPersonController.findAll()
//       expect(legalPersonService.findAll).toHaveBeenCalled()
//     })
//   })

//   describe('findOne()', () => {
//     it('should find a legal person', () => {
//       expect(legalPersonController.findOne(3)).resolves.toEqual({ id: 3, ...oneLegalPersonFixture })
//       expect(legalPersonService.findOne).toHaveBeenCalled()
//     })
//   })

//   describe('remove()', () => {
//     it('should remove the legal person', () => {
//       legalPersonController.remove(2)
//       expect(legalPersonService.remove).toHaveBeenCalled()
//     })
//   })
// })
