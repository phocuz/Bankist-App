

const account1 = {
  owner: "Ishola Victor",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDate: [
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
  ],
};

const account2 = {
  owner: "Farouk Ejalonibu",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDate: [
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
  ],
};

const account3 = {
  owner: "Arowolo Victor Joel",
  movements: [1000, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDate: [
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
  ],
};

const account4 = {
  owner: "Babatunde Sanwoolu",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDate: [
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
  ],
};

const account5 = {
  owner: "Ahmed Abdullahi",
  movements: [440, -1000, -329, 501, 950],
  interestRate: 1.2,
  pin: 5555,
  movementsDate: [
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 14 2024 10:41:44 GMT+0100",
    "Thu Mar 16 2024 10:41:44 GMT+0100",
    "Thu Mar 17 2024 10:41:44 GMT+0100",
    "Thu Mar 25 2024 10:41:44 GMT+0100",
  ],
};
const accounts = [account1, account2, account3, account4, account5];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const formatMovementsDate = (date) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} Ago`;
  else {
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
};
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDate[i]);
    const displayDate = formatMovementsDate(date);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = () => {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    //in each call,print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    //when 0 seconds,stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Login to get started`;
      containerApp.style.opacity = 0;
    }
    //Decrease 1s
    time--;
  };
  //set timeout
  let time = 120;
  tick();
  //cal the timer every second
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// EVENT HANDLERS

let currentAccount, timer;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  //timer function
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();

  if (currentAccount?.pin === +inputLoginPin.value) {
    //display UI and message
    labelWelcome.textContent = `Welcome back chief,${
      currentAccount.owner.split(" ")[0]
    }😍💶`;
    containerApp.style.opacity = 100;

    //create current date and time
    const now = new Date();
    // console.log(now);
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const minutes = `${now.getMinutes()}`.padStart(2, 0);
    labelDate.textContent = `${day}/${month}/${year} ${hour}:${minutes}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer date
    currentAccount.movementsDate.push(new Date().toISOString());
    receiverAcc.movementsDate.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    //Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      //Add transfer date
      currentAccount.movementsDate.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      //Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 3000);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
