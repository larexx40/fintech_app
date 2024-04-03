import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/user/user.interface';
import { UserRoles } from 'src/utils/enum';
import { UpdateUserDto } from 'src/user/user.dto';

// Mock UserModel
const mockUserModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findOneAndDelete:jest.fn(),
    // Add other methods as needed
};

// mock bcrypt and jwt they are used in AuthService
jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('hashedPassword'),
    compare: jest.fn().mockResolvedValue('password')
}));

// Mock UserRepository functions as they are used by UserService
jest.mock('src/user/user.repository', () => {
    return {
      UserRepository: jest.fn().mockImplementation(() => ({
        createUser: jest.fn(),
        checkIfExist: jest.fn(),
        findOne:jest.fn(),
        getAllUser: jest.fn(),
        findAll:jest.fn(),
        getUserBalance:jest.fn(),
        updateProfile:jest.fn(),
        remove:jest.fn()
        // Mock other methods used by UserService as needed
      })),
    };
});
  

describe('UserService', () => {
    let userService: UserService;
    let userRepository: UserRepository;

    const mockUserId = 'valid-user-id';
    const mockUser: IUser={
        userId: mockUserId,
        firstName: 'Topsyn',
        lastName: 'Omi',
        email: 'omitop@gmai.com',
        balance: 100,
        password: '$2b$10$gbloA9KNhb3z.lYVSGraFOvfZ1xU/GzRiL.DW7MVceHA.SelXXE9K',
        pin: 0,
        username: '',
        emailVerified: false,
        phoneVerified: false,
        pinSet: false,
        role: UserRoles.USER,
    }
    
    beforeEach(async () => {
        // Initialize your mocked UserService and UserRepository before each test
        userRepository = new UserRepository(mockUserModel as any); // This will utilize the mocked UserRepository
        userService = new UserService(userRepository); // Pass the mocked UserRepository
    });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //create user test
  describe('createUser', () => {
    const createUserDto = {
        firstName: 'Topsyn',
        lastName: 'Omi',
        email: 'omitop@gmai.com',
        password: 'jkdkh',
        username: 'Topy'
    }
    
    it('should throw BadRequestException if createUserDto is not provided', async () => {
        await expect(userService.createUser(null)).rejects.toThrow(BadRequestException);
    });

    it('should call userRepository.createUser with correct parameters', async () => {
        await userService.createUser(createUserDto);
        expect(userRepository.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  //get user by id test
  describe('findOne', () => {
    it('should successfully return a user for a valid ID', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
  
      const result = await userService.findOne(mockUserId);
  
      expect(userRepository.findOne).toHaveBeenCalledWith(mockUserId);
      expect(result).toEqual(mockUser);
    });
  
    it('should throw BadRequestException when no ID is provided', async () => {
      await expect(userService.findOne('')).rejects.toThrow(BadRequestException);
    });
  
    it('should throw NotFoundException when a user is not found for a valid ID', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
  
      await expect(userService.findOne(mockUserId)).rejects.toThrow(NotFoundException);
    });
  });

  //get user balance test
  describe('getUserBalance', () => {
    const mockUserBalance = 100; // Example balance
 
    it('should return the balance of a user for a valid ID', async () => {  
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser); 
      const balance = await userService.getUserBalance(mockUserId);  
      // expect(userRepository.findOne).toHaveBeenCalledWith(mockUserId);
      expect(balance).toEqual(mockUserBalance);
    });
  
    it('should throw BadRequestException when no ID is provided', async () => {
      await expect(userService.getUserBalance('')).rejects.toThrow(BadRequestException);
    });
  
    it('should throw NotFoundException when a user is not found for a valid ID', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);  
      await expect(userService.getUserBalance(mockUserId)).rejects.toThrow(NotFoundException);
    });
  });
  
  //update user profile test
  describe('updateProfile', () => {
    const userId = '123';
    const updateUserDto: UpdateUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      address: 'jjhbjh',
      occupation: 'jhkhjh',
      dob: new Date('1990-01-01'),
    };

    it('should successfully update a user profile', async () => {
        jest.spyOn(userRepository, 'updateProfile').mockResolvedValue({
          ...updateUserDto,
          userId,
          email: mockUser.email,
        } as IUser);

        const result = await userService.updateProfile(userId, updateUserDto);

        expect(userRepository.updateProfile).toHaveBeenCalledWith(userId, updateUserDto);
        expect(result).toEqual(expect.objectContaining(updateUserDto));
    });

    it('should throw BadRequestException if updateUserDto is not provided', async () => {
        await expect(userService.updateProfile(userId, null)).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if the user does not exist', async () => {
        jest.spyOn(userRepository, 'updateProfile').mockResolvedValue(null);

        await expect(userService.updateProfile('non-existent-id', updateUserDto)).rejects.toThrow(NotFoundException);
    });

  });


  //deleteUser
  describe('remove', () => {

    it('should remove a user successfully', async () => {
      // Mock UserRepository to resolve with a user when remove is called
      jest.spyOn(userRepository, 'remove').mockResolvedValue(true);
      // Call remove method
      await userService.deleteUser(mockUserId);
      expect(userRepository.remove).toHaveBeenCalledWith(mockUserId);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      // Mock UserRepository to resolve with null when remove is called
      jest.spyOn(userRepository, 'remove').mockResolvedValue(null);
      // Call the service
      await expect(userService.deleteUser('not-exist-id')).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if userId is not provided', async () => {
      // Call remove method without providing userId
      await expect(userService.deleteUser(null)).rejects.toThrow(BadRequestException);

      // Expectations
      expect(userRepository.findOne).not.toHaveBeenCalled(); // findOne should not be called
      expect(userRepository.remove).not.toHaveBeenCalled(); // remove should not be called
    });

  });

 
});
