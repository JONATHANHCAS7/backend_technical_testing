import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user if credentials are correct', async () => {
      const result = await service.validateUser('testuser', 'password123');
      expect(result).toEqual({ username: 'testuser' });
    });

    it('should return null if credentials are incorrect', async () => {
      const result = await service.validateUser('testuser', 'wrongpassword');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token', async () => {
      const user = { username: 'testuser' };
      const token = 'mocked.jwt.token';
      mockJwtService.sign.mockReturnValue(token);

      const result = await service.login(user);

      expect(mockJwtService.sign).toHaveBeenCalledWith({ username: 'testuser', sub: 'testuser' });
      expect(result).toEqual({ access_token: token });
    });
  });
});