import accounts from '../models/accounts';
import transactions from '../models/transactions';

// eslint-disable-next-line max-len
export const getAccountDetails = accountNumber => accounts.find(account => account.accountNumber === accountNumber);

class AccountHelper {
  /**
   *helps generate a new account
   *
   * @static generateAccountNumber
   * @returns a ten digit number
   * @memberof AccountHelper
   */
  static generateAccountNumber() {
    const numbers = [];

    const record = accounts.map(account => account.accountNumber);

    while (numbers.length < 10) {
      numbers.push(Math.floor(Math.random() * 10));
    }

    const digitizeNumbers = parseInt(numbers.join(''), 10);

    if (record.includes(digitizeNumbers)) return AccountHelper.generateAccountNumber();

    return digitizeNumbers;
  }

  /**
   *helps save a new account in the accounts record
   *
   * @static saveAccount
   * @param {object} { accountNumber, id, type }
   * @memberof AccountHelper
   */
  static saveAccount({ accountNumber, id, type }) {
    accounts.push({
      id: accounts.length + 1,
      accountNumber,
      createdOn: new Date().toString(),
      owner: id,
      type,
      status: 'active',
      balance: 0,
    });
  }

  /**
   *helps toggle the specified accounts number's status
   *
   * @static toggleAccountStatus
   * @param {integer} accountNumber
   * @memberof AccountHelper
   */
  static toggleAccountStatus(accountNumber) {
    const targetAccount = getAccountDetails(accountNumber);

    targetAccount.status = targetAccount.status === 'active' ? 'dormant' : 'active';
  }

  /**
   *helps delete an account with given account number from accounts record
   *
   * @static deleteAccount
   * @param {object} accountNumber
   * @memberof AccountHelper
   */
  static deleteAccount(accountNumber) {
    const accountsIndex = getAccountDetails(accountNumber);

    accounts.splice(accountsIndex, 1);
  }

  /**
   *helps debit account
   *
   * @static debit account
   * @param {integer} accountNumber
   * @param {integer} amount
   * @returns an object of oldBalance and newBalance
   * @memberof transactions
   */
  static debitAccount(accountNumber, amount) {
    const accountToDebit = getAccountDetails(accountNumber);

    const oldBalance = accountToDebit.balance;

    accountToDebit.balance -= amount;

    const newBalance = accountToDebit.balance.toFixed(2);

    return {
      oldBalance,
      newBalance,
    };
  }

  /**
   *helps save new transaction in record
   *
   * @static saveTransaction
   * @param {object} {
   *     accountNumber, amount, transactionType, cashierId, oldBalance, newBalance,
   *   }
   * @memberof transactions
   */
  static saveTransaction({
    accountNumber,
    amount,
    transactionType,
    cashierId,
    oldBalance,
    newBalance,
  }) {
    const newTrasaction = {
      transactionId: transactions.length,
      createdOn: new Date().toString(),
      transactionType,
      accountNumber,
      cashierId,
      amount,
      oldBalance,
      newBalance,
    };

    transactions.push(newTrasaction);
  }
}

export default AccountHelper;
