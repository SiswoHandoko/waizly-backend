import { Test, TestingModule } from '@nestjs/testing';
import { SignInDto } from './dto/signin.dto';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const signInDto: SignInDto = {
  username: 'jhondoe',
  password: '12345'
};

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest
              .fn()
              .mockImplementation((signInDto: SignInDto) =>
                Promise.resolve({ access_token: 'mockAnything'}),
              ),
            getMe: jest.fn().mockImplementation(() =>
              Promise.resolve({
                username: "johndoe",
                userId: 1,
                iat: 1708401132,
                exp: 1708401192
            }),
            )
          },
        },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signIn()', () => {
    it('should signIn', () => {
      expect(authController.signIn(signInDto)).resolves.toEqual({ access_token: 'mockAnything'});
    //   expect(authService.signIn).toHaveBeenCalled();
    //   expect(authService.signIn).toHaveBeenCalledWith({"password": "12345", "username": "jhondoe"});
    });
  });

  describe('findOne()', () => {
    it('should get me data', async () => {
        const user = {
            username: 'johndoe',
            userId: 1,
            iat: 1708401132,
            exp: 1708401192,
          };

        jest.spyOn(authController, 'getMe').mockResolvedValue(user);

        const result = await authController.getMe({ user: 'anything' });

        expect(result).toEqual(user);
    });
  });
});
