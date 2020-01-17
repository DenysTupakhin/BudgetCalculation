let btnStart = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],
 
    inputExpenses = document.getElementsByClassName('expenses-item'),
    btnApprove = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optExp = document.querySelectorAll('.optionalexpenses-item'),
    possibleIncome = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumChoose = document.querySelector('.choose-sum'),
    percentChoose = document.querySelector('.choose-percent'),
    year = document.querySelector('.year-value'),
    month = document.querySelector('.month-value'),
    day = document.querySelector('.day-value');


let money, time;

btnStart.addEventListener('click', function() {
        time = prompt("Введите дату в формате YYYY-MM-DD", "");
        money = +prompt("Ваш бюджет на месяц?", "");

    while(isNaN(money) || money == '' || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth() + 1;
    day.value = new Date(Date.parse(time)).getDate(); 
});

btnApprove.addEventListener('click', function() {
    let sum = 0;
    for (let i = 0; i < inputExpenses.length; i++) {
        let a = inputExpenses[i].value,
            b = inputExpenses[++i].value;
    
        if ( (typeof (a))=== 'string' && (typeof (a)) != null && (typeof (b)) != null && a != '' && b !=''
           && a.length < 30 ) {
            console.log('done');
            appData.expenses[a] = b;
            sum += +b; 
        } else {
            i = i - 1;
        }    
    }
    expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function() {
    for (let i= 0; i < optExp.length; i++) {
        let opt = optExp[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' '; 
    }
});

countBtn.addEventListener('click', function() {

    if (appData.budget != undefined) {
        
        appData.moneyPerDay = (appData.budget/30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            levelValue.textContent = 'Litle wealth';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay <1000) {
            levelValue.textContent ='Average income';
        } else if (appData.moneyPerDay > 1000) {
            levelValue.textContent = 'High level of wealth';
        }else {
            levelValue.textContent = 'An error has occured';
        }
    } else {
        dayBudgetValue.textContent = 'ERROR';
    }
    });

possibleIncome.addEventListener('input', function() {
    let items = possibleIncome.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
}); 

checkSavings.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumChoose.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +sumChoose.value,
            percent = +percentChoose.value;

        appData.monthsavingsValue = sum/100/12*percent;
        appData.yearsavingsValue = sum/100*percent; 
        
        monthsavingsValue.textContent = appData.monthsavingsValue.toFixed(1);
        yearsavingsValue.textContent = appData.yearsavingsValue.toFixed(1);
    }
});

percentChoose.addEventListener('input', function() {
        if (appData.savings == true) {
        let sum = +sumChoose.value,
            percent = +percentChoose.value;

        appData.monthsavingsValue = sum/100/12*percent;
        appData.yearsavingsValue = sum/100*percent; 
        
        monthsavingsValue.textContent = appData.monthsavingsValue.toFixed(1);
        yearsavingsValue.textContent = appData.yearsavingsValue.toFixed(1);
    }
});    

let appData = {
    budget: (money),
    timeData: (time),
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,  
};
