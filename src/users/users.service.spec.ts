import { Test, TestingModule } from '@nestjs/testing';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/sequelize';
import { NotFoundException } from '@nestjs/common';

const usersArray = [
  {
    firstName: 'firstName #1',
    lastName: 'lastName #1',
    isActive: true,
  },
  {
    firstName: 'firstName #2',
    lastName: 'lastName #2',
    isActive: false,
  },
];

const oneUser = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
  isActive: true,
};

describe('UserService', () => {
  let service: UsersService;
  let model: typeof User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: {
            findAll: jest.fn(() => usersArray),
            findOne: jest.fn(),
            create: jest.fn(() => oneUser),
            remove: jest.fn(),
            destroy: jest.fn(() => oneUser),
            update: jest.fn(() => oneUser),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<typeof User>(getModelToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      const oneUser = {
        firstName: 'firstName #1',
        lastName: 'lastName #1',
        isActive: true,
      };
      expect(
        service.create({
          firstName: 'firstName #1',
          lastName: 'lastName #1',
          isActive: true,
        }),
      ).toEqual(oneUser);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual(usersArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => {
      const findSpy = jest.spyOn(model, 'findOne');
      expect(service.findOne('1'));
      expect(findSpy).toBeCalledWith({ where: { id: '1' } });
    });
  });

  describe('remove()', () => {
    it('should remove a user', async () => {
      const findSpy = jest.spyOn(model, 'findOne').mockReturnValue({
        destroy: jest.fn(),
      } as any);
      const retVal = await service.remove('2');
      expect(findSpy).toBeCalledWith({ where: { id: '2' } });
      expect(retVal).toBeUndefined();
    });
  });

  describe('update()', () => {
    it('should successfully update a user', async () => {
      const updatedUser = {
        id: '1',
        firstName: 'Updated First Name',
        lastName: 'Updated Last Name',
        isActive: true,
      };
  
      service.findOne = jest.fn().mockResolvedValue(oneUser);
			const mock = jest.spyOn(service, 'update');

      const newOneUser = {
        firstName: 'firstName #1',
        lastName: 'lastName #1',
        isActive: true,
        update:jest.fn((string, any) => updatedUser)
      }
      const result = await newOneUser.update('1', updatedUser);
  
      expect(result).toEqual(updatedUser);
    });
  
  });
});
