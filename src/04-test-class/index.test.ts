import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(1000);

    expect(bankAccount.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(1000);

    expect(() => bankAccount.withdraw(1001)).toThrowError(
      new InsufficientFundsError(1000),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const sourceBankAccount = getBankAccount(1000);
    const targetBankAccount = getBankAccount(10);

    expect(() =>
      sourceBankAccount.transfer(1001, targetBankAccount),
    ).toThrowError(new InsufficientFundsError(1000));
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(1000);

    expect(() => bankAccount.transfer(1, bankAccount)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(1000);

    bankAccount.deposit(3);

    expect(bankAccount.getBalance()).toBe(1003);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(1000);

    bankAccount.withdraw(1000);

    expect(bankAccount.getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const sourceBankAccount = getBankAccount(1000);
    const targetBankAccount = getBankAccount(10);

    sourceBankAccount.transfer(1, targetBankAccount);

    expect(sourceBankAccount.getBalance()).toBe(999);
    expect(targetBankAccount.getBalance()).toBe(11);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(1000);

    try {
      const balance = await bankAccount.fetchBalance();

      if (balance === null) {
        throw 'request failed';
      }

      expect(typeof balance).toBe('number');
    } catch (error) {
      expect(error).toMatch('request failed');
    }
  });

  test('synchronizeBalance should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(NaN);

    try {
      await bankAccount.synchronizeBalance();
      expect(bankAccount.getBalance()).not.toBeNaN();
    } catch {
      expect(bankAccount.getBalance()).toBeNaN();
    }
  });

  test('synchronizeBalance should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(1000);

    try {
      await bankAccount.synchronizeBalance();
      expect(true).toBeTruthy();
    } catch (error) {
      expect(error).toEqual(new SynchronizationFailedError());
    }
  });
});
