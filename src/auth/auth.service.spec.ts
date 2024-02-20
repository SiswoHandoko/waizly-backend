import { Test, TestingModule } from '@nestjs/testing';
import { Auth } from './models/auth.model';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

const login = {
  username: 'jhondoe',
  password: '12345',
};

const oneUser = {
  username: 'jhondoe',
  password: '12345',
};

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let model: typeof Auth;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(Auth),
          useValue: {
            findOne: jest.fn().mockResolvedValue(oneUser), // Mock to return user object
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(() => 'fake-access-token'),
          },
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    model = module.get<typeof Auth>(getModelToken(Auth));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('signIn()', () => {
    it('should successfully signin', async () => {
      const mockAuth = {
        username: 'jhondoe',
        userId: 1,
        password: await bcrypt.hash('12345', 10), // Hashed password
      };

      // Mock the findOne method of authModel to return the mockAuth object
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(mockAuth as any);

      const token = {
        access_token: "fake-access-token"
      };
      expect(
        await service.signIn('jhondoe','12345'),
      ).toEqual(token);
    });
    it('should throw UnauthorizedException when username is not found', async () => {
      // Mock the findOne method of authModel to return null (user not found)
      model.findOne = jest.fn().mockResolvedValue(oneUser);

      await expect(service.signIn('invalidUsername','12345')).rejects.toThrowError(UnauthorizedException);
    });
  });
});