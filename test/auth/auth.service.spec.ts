import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { IUser, UserData } from 'src/user/user.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserRoles } from 'src/utils/enum';

// Mock UserModel
const mockUserModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    // Add other methods as needed
};



// mock bcrypt and jwt they are used in AuthService
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn().mockResolvedValue('password')
}));
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mockToken'),
}));

// Mock UserRepository functions as they are used by UserService
jest.mock('src/user/user.repository', () => {
  return {
    UserRepository: jest.fn().mockImplementation(() => ({
      createUser: jest.fn(),
      checkIfExist: jest.fn(),
      // Mock other methods used by UserService as needed
    })),
  };
});

// Adjust the UserService mock if necessary, especially if its constructor or methods are more complex
jest.mock('src/user/user.service', () => {
  return {
    UserService: jest.fn().mockImplementation(() => ({
        createUser: jest.fn(),
        checkIfExist: jest.fn(),
        findUserLogin: jest.fn(),
        login: jest.fn(),
        getProfile: jest.fn(),
        findOne: jest.fn(),
        // Mock methods as needed, ensuring they return values or Promises as expected in real implementations
    })),
  };
});

describe('AuthService', () => {
    let authService: AuthService;
    let userService: UserService;
    let userRepository: UserRepository;

    const user: IUser={
        userId: 'hdhdh',
        firstName: 'Topsyn',
        lastName: 'Omi',
        email: 'omitop@gmai.com',
        balance: 0,
        password: '$2b$10$gbloA9KNhb3z.lYVSGraFOvfZ1xU/GzRiL.DW7MVceHA.SelXXE9K',
        pin: 0,
        username: '',
        emailVerified: false,
        phoneVerified: false,
        pinSet: false,
        role: UserRoles.USER,
    }

    const userId = 'valid-user-id';
    const userData: UserData = {
        userId: userId,
        username: 'testUser',
        email: 'test@example.com',
        firstName: '',
        lastName: '',
        balance: 0,
        password: '',
        emailVerified: false,
        phoneVerified: false,
        pinSet: false
    };

    beforeEach(async () => {
        // Initialize your mocked UserService and UserRepository before each test
        userRepository = new UserRepository(mockUserModel as any); // This will utilize the mocked UserRepository
        userService = new UserService(userRepository); // Pass the mocked UserRepository
        authService = new AuthService(userService); // Finally, instantiate AuthService with the mocked UserService
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('signUp', () => {
        const createUserDto = {
            firstName: 'Topsyn',
            lastName: 'Omi',
            email: 'omitop@gmai.com',
            password: 'jkdkh',
            username: 'Topy'
        }
        
        it('should throw BadRequestException if createUserDto is not provided', async () => {
            await expect(authService.signUp(null)).rejects.toThrow(BadRequestException);
        });

        it('should successfully sign up a new user', async () => {
            // jest.spyOn(hash, 'hash').mockResolvedValue('hashedPassword');
            jest.spyOn(userService, 'checkIfExist').mockResolvedValue(null);
            jest.spyOn(userService, 'createUser').mockResolvedValue(user);
            // jest.spyOn(jwt, 'sign').mockReturnValue();
        
            const result = await authService.signUp(createUserDto);
        
            expect(result.token).toBeDefined();
            expect(result.email).toEqual(createUserDto.email);
            expect(userService.createUser).toHaveBeenCalledWith({ ...createUserDto, password: 'hashedPassword' });
        });

        it('should throw ConflictException if email already exists', async () => {
            jest.spyOn(userService, 'checkIfExist').mockResolvedValueOnce(true);
            await expect(authService.signUp(createUserDto)).rejects.toThrow(ConflictException);
        });

        

        // Add more tests as needed...
    });

    describe('login', ()=>{
        const loginDto = {
            emailOrUsername: 'omitop@gmail.com',
            password: 'gggg'
        }
        
        it('should throw BadRequestException if loginDto is not provided', async () => {
            await expect(authService.login(null)).rejects.toThrow(BadRequestException);
        });

        it('should throw NotFoundException if user is not found', async () => {
            jest.spyOn(userService, 'findUserLogin').mockResolvedValue(null);
            await expect(authService.login(loginDto)).rejects.toThrow(NotFoundException);
        });

        it('should throw BadRequestException if invalid password', async () => {        
            jest.spyOn(userService, 'findUserLogin').mockResolvedValue({...user});
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
            await expect(authService.login(loginDto)).rejects.toThrow(BadRequestException);
        });

        it('should successfully login an existing user', async () => {
            jest.spyOn(userService, 'findUserLogin').mockResolvedValue({...user});
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
            jest.spyOn(jwt, 'sign').mockReturnValue();
        
            const result = await authService.login(loginDto);
        
            // expect(result.token).toBeDefined();
            expect(result.user).toBeDefined();
        });

    });

    describe('profile', ()=>{
        const userId = "sdhh"
        it('should throw BadRequestException if userid is not provided', async () => {        
            await expect(authService.getProfile(null)).rejects.toThrow(BadRequestException);
        });
        it('should throw NotFoundException if user is not found', async () => {
            jest.spyOn(userService, 'findOne').mockResolvedValue(null);
            await expect(authService.getProfile('nonexistent-user-id')).rejects.toThrow(NotFoundException);
        });
        it('should return user data if valid userId is provided', async () => {
            jest.spyOn(userService, 'findOne').mockResolvedValue(userData);
            const result = await authService.getProfile(userId);
            expect(result).toEqual(userData);
        });
    })

  

  // Additional describe blocks for other AuthService methods...
});