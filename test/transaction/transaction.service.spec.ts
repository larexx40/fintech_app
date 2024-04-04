import { BadRequestException, NotFoundException } from "@nestjs/common";
import { NewTransactionDto } from "src/transaction/transaction.dto";
import { ITransaction } from "src/transaction/transaction.interface";
import { TransactionRepository } from "src/transaction/transaction.repository";
import { TransactionService } from "src/transaction/transaction.service";
import { UserRepository } from "src/user/user.repository";
import { UserService } from "src/user/user.service";
import { TransactionStatus, TransactionType } from "src/utils/enum";

// Mock UserModel
const mockTransactionModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findOneAndDelete:jest.fn(),
    // Add other methods as needed
};

const mockUserModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    // Add other methods as needed
};

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
            getUserBalance: jest.fn(),
            deductUserBalance: jest.fn(),
            addToUserBalance: jest.fn(),
            
          // Mock methods as needed, ensuring they return values or Promises as expected in real implementations
      })),
    };
  });

// Mock TransactionRepository functions as they are used by TransactionService
jest.mock('src/transaction/transaction.repository', () => {
    return {
      TransactionRepository: jest.fn().mockImplementation(() => ({
        createTransaction: jest.fn(),
        changeTransactionStatus: jest.fn(),
        getUserTransactions:jest.fn(),
        getUserTransactionById: jest.fn(),
        findOne: jest.fn(),
        
        // Mock other methods used by TransactionService as needed
      })),
    };
});

describe('TransactionService', () => {
    let transactionService: TransactionService;
    let transactionRepository: TransactionRepository;
    let userRepository: UserRepository;
    let userService: UserService;

    const mockTransactionId = 'valid-transaction-id';
    const mockUserId = 'valid-user-id';
    const mockTransaction: ITransaction={
        userId: mockUserId,
        transactionId: mockTransactionId,
        amount: 100,
        transactionType: TransactionType.SEND,
        status:TransactionStatus.SUCCESS,
        description: "paid for a transaction"
    }
    
    beforeEach(async () => {
        // Initialize your mocked TransactionService and TransactionRepository before each test
        userRepository = new UserRepository(mockUserModel as any); // This will utilize the mocked UserRepository
        userService = new UserService(userRepository); // Pass the mocked UserRepository
        transactionRepository = new TransactionRepository(mockTransactionModel as any); // This will utilize the mocked TransactionRepository
        transactionService = new TransactionService(transactionRepository, userService); // Pass the mocked TransactionRepository
    });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //create transaction test
  describe('createTransaction', () => {
    const createTransactionDto: NewTransactionDto = {
        amount: 10,
        transactionType: TransactionType.SEND
    }
    
    it('should throw BadRequestException if createTransactionDto is not provided', async () => {
        await expect(transactionService.createTransaction('', null)).rejects.toThrow(BadRequestException);
    });

    it('should successfully create a transaction for a user', async () => {
        jest.spyOn(userService, 'getUserBalance').mockResolvedValue(100);
        jest.spyOn(userService, 'addToUserBalance').mockResolvedValue(100);
        jest.spyOn(userService, 'deductUserBalance').mockResolvedValue(100,);

        await transactionService.createTransaction(mockUserId, createTransactionDto);
        expect(transactionRepository.createTransaction).toHaveBeenCalledWith(mockUserId, createTransactionDto);
    });
  });

  //get transaction by id test
  describe('getTransactionById', () => {
    it('should successfully return a transaction for a valid ID', async () => {
      jest.spyOn(transactionRepository, 'findOne').mockResolvedValue(mockTransaction);
  
      const result = await transactionService.getTransactionById(mockTransactionId);
  
      expect(transactionRepository.findOne).toHaveBeenCalledWith(mockTransactionId);
      expect(result).toEqual(mockTransaction);
    });
  
    it('should throw BadRequestException when no ID is provided', async () => {
      await expect(transactionService.getTransactionById('')).rejects.toThrow(BadRequestException);
    });
  
    it('should throw NotFoundException when a user is not found for a valid ID', async () => {
      jest.spyOn(transactionRepository, 'findOne').mockResolvedValue(null);
  
      await expect(transactionService.getTransactionById(mockTransactionId)).rejects.toThrow(NotFoundException);
    });
  });

  //get user transaction by id test
  describe('getUserTransactionById', () => {
    it('should successfully return a user transaction for a valid ID', async () => {
      jest.spyOn(transactionRepository, 'getUserTransactionById').mockResolvedValue(mockTransaction);
  
      const result = await transactionService.getUserTransactionById(mockUserId, mockTransactionId);
  
      expect(transactionRepository.getUserTransactionById).toHaveBeenCalledWith(mockUserId,mockTransactionId);
      expect(result).toEqual(mockTransaction);
    });
  
    it('should throw BadRequestException when no ID is provided', async () => {
      await expect(transactionService.getUserTransactionById('','')).rejects.toThrow(BadRequestException);
    });
  
    it('should throw NotFoundException when a user is not found for a valid ID', async () => {
      jest.spyOn(transactionRepository, 'getUserTransactionById').mockResolvedValue(null);
  
      await expect(transactionService.getUserTransactionById(mockUserId, mockTransactionId)).rejects.toThrow(NotFoundException);
    });
  });

  //get user transaction by id test
  describe('getUserTransactionById', () => {
    it('should successfully return a user transaction for a valid ID', async () => {
      jest.spyOn(transactionRepository, 'getUserTransactionById').mockResolvedValue(mockTransaction);
  
      const result = await transactionService.getUserTransactionById(mockUserId, mockTransactionId);
  
      expect(transactionRepository.getUserTransactionById).toHaveBeenCalledWith(mockUserId,mockTransactionId);
      expect(result).toEqual(mockTransaction);
    });
  
    it('should throw BadRequestException when no ID is provided', async () => {
      await expect(transactionService.getUserTransactionById('','')).rejects.toThrow(BadRequestException);
    });
  
    it('should throw NotFoundException when a user is not found for a valid ID', async () => {
      jest.spyOn(transactionRepository, 'getUserTransactionById').mockResolvedValue(null);
  
      await expect(transactionService.getUserTransactionById(mockUserId, mockTransactionId)).rejects.toThrow(NotFoundException);
    });
  });

})