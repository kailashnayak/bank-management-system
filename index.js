
  function BankAccount(accountNumber, name, type, balance) {
    this.accountNumber = accountNumber;
    this.name = name;
    this.type = type;
    this.balance = balance;
    this.active = true;
  }

  BankAccount.prototype.deposit = function(amount) {
    if (amount > 0) {
      this.balance += amount;
      return `Deposited $${amount} into account ${this.accountNumber}.`;
    } else {
      return 'Invalid deposit amount.';
    }
  };

  BankAccount.prototype.withdraw = function(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      return `Withdrawn $${amount} from account ${this.accountNumber}.`;
    } else {
      alert('Insufficient funds or invalid withdrawal amount.');
      return 'Failed to withdraw.';
    }
  };

  BankAccount.prototype.checkBalance = function() {
    return this.balance;
  };

  BankAccount.prototype.isActive = function() {
    return this.active;
  };

  const accounts = [
    new BankAccount(12345, 'den', 'Savings', 1000),
    new BankAccount(23456, 'smith', 'Current', 500),
  ];

  function createAccountElement(account) {
    const accountDiv = document.createElement('div');
    accountDiv.innerHTML = `
      <h2>${account.name} - ${account.type}</h2>
      <label for="depositAmount${account.accountNumber}">Deposit Amount:</label>
      <input type="number" id="depositAmount${account.accountNumber}">
      <button onclick="deposit(${account.accountNumber})">Deposit</button>
      <label for="withdrawAmount${account.accountNumber}">Withdraw Amount:</label>
      <input type="number" id="withdrawAmount${account.accountNumber}">
      <button onclick="withdraw(${account.accountNumber})">Withdraw</button>

      <button onclick="checkIsActive(${account.accountNumber})">Check Active</button>
      
      <p>Balance: $<span id="balance${account.accountNumber}">${account.checkBalance()}</span></p>
    `;
    return accountDiv;
  }

  function deposit(accountNumber) {
    const depositAmountInput = document.getElementById(`depositAmount${accountNumber}`);
    const depositAmount = parseFloat(depositAmountInput.value);
    const account = accounts.find(acc => acc.accountNumber === accountNumber);

    const result = account.deposit(depositAmount);
    document.getElementById(`balance${accountNumber}`).textContent = account.checkBalance();
    depositAmountInput.value = '';
    updateTotalBalance();
  }

  function withdraw(accountNumber) {
    const withdrawAmountInput = document.getElementById(`withdrawAmount${accountNumber}`);
    const withdrawAmount = parseFloat(withdrawAmountInput.value);
    const account = accounts.find(acc => acc.accountNumber === accountNumber);

    const result = account.withdraw(withdrawAmount);
    document.getElementById(`balance${accountNumber}`).textContent = account.checkBalance();
    withdrawAmountInput.value = '';
    updateTotalBalance();
  }

  function checkIsActive(accountNumber) {
    const account = accounts.find(acc => acc.accountNumber === accountNumber);
    alert(`Account ${account.accountNumber} is active: ${account.isActive()}`);
  }

  function getTotalBalance() {
    return accounts.reduce((total, account) => {
      if (account.isActive()) {
        return total + account.balance;
      } else {
        return total;
      }
    }, 0);
  }

  function updateTotalBalance() {
    const totalBalance = getTotalBalance();
    document.getElementById('totalBalance').textContent = totalBalance;
  }

  function testTotalBalance() {
    updateTotalBalance();
  }

  const accountsContainer = document.getElementById('accounts-container');
  accounts.forEach(account => {
    accountsContainer.appendChild(createAccountElement(account));
  });