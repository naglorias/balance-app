'use strict';

//variables
const budgetInput = document.getElementById('my-budget');
const calculateBtn = document.querySelector('.calculate');
const expenseTitle = document.getElementById('my-expenses');
const expenseInput = document.getElementById('expense-value');
const addBtn = document.querySelector('.add');
const budgetAmount = document.querySelector('.budget-amount input');
const expensesAmount = document.querySelector('.expenses-amount input');
const balanceAmount = document.querySelector('.balance input');
const expensesTable = document.getElementById('expenses-table');

let totalExpensesAmount = 0;

//get budget function
const getBudget = () => {
    let parsedValue = parseInt(budgetInput.value);
    if (budgetInput.value === '' || budgetInput.value < 0) {
        document.querySelector('.error-message').classList.remove('invisible');
        document.querySelector('.error-message').classList.add('visible');
    }
    else{
        budgetAmount.value = parsedValue;
        document.querySelector('.error-message').classList.add('invisible');
        document.querySelector('.error-message').classList.remove('visible');
        budgetInput.value = '';
    }
    getBalanceAmount();
}



// calculate total expenses function
const getTotalExpenses = () => {
    let value = parseInt(expenseInput.value);
    if (expenseInput.value === '' || expenseInput.value < 0 || expenseTitle.value === '') {
        document.querySelector('.error-message').classList.remove('invisible');
        document.querySelector('.error-message').classList.add('visible');
    }
    else{
        document.querySelector('.error-message').classList.add('invisible');
        document.querySelector('.error-message').classList.remove('visible');
        totalExpensesAmount += value;
        expensesAmount.value = totalExpensesAmount;
        displayExpenses();
    }
    getBalanceAmount();
 }



// calculate balance amount function
const getBalanceAmount = () => {
    balanceAmount.value = budgetAmount.value - totalExpensesAmount;

 }


//create expenses table function
const displayExpenses = () => {
    let todayDate = new Date(),
        month = todayDate.getMonth() + 1,
        day = todayDate.getDate(),
        year = todayDate.getFullYear();
        let borderLine = document.createElement('tr');
        let dataCell1 = document.createElement('td');
        let dataCell2 = document.createElement('td');
        let dataCell3 = document.createElement('td');
        let dataCell4 = document.createElement('td');
        let div = document.createElement('div');
        let removeElement = document.createElement('i');
        let editElement = document.createElement('i');
        borderLine.setAttribute('class', 'border-bottom  border-2 border-dark-subtle');
        div.setAttribute('class', 'icons d-flex');
        removeElement.setAttribute('class', 'bi bi-trash-fill');
        removeElement.setAttribute('title', 'remove');
        removeElement.setAttribute('id', 'remove');
        removeElement.addEventListener('click', function (event) {
            removeExpenses(event.target)
        })//event listener callback the remove function
        editElement.setAttribute('class', 'bi bi-pencil-fill me-3');
        editElement.setAttribute('title', 'edit');
        editElement.setAttribute('id', 'edit');
        editElement.addEventListener('click', function() {
            editExpenses(dataCell3)
        })//event listener callback the edit function
        dataCell1.textContent = `${day}/${month}/${year}`;
        dataCell2.textContent = `${expenseTitle.value}`;
        dataCell3.textContent = `${expenseInput.value}`;
        div.append(editElement, removeElement)
        dataCell4.appendChild(div);
        borderLine.append(dataCell1, dataCell2, dataCell3, dataCell4);
        expensesTable.appendChild(borderLine);
        expenseTitle.value = '';
        expenseInput.value = '';
 }

//remove specific expense from  table 
const removeExpenses = (x) => {
    x.closest('.border-bottom').remove();
    let removedValue = +x.parentElement.parentElement.previousSibling.textContent;
    totalExpensesAmount = totalExpensesAmount - removedValue;
    expensesAmount.value = totalExpensesAmount ;
   getBalanceAmount();
 }

//edit specific expense in table
const editExpenses = (x) => { 
    x.classList.add('editing');
    expenseInput.classList.add('editing');
    expenseInput.value = x.textContent.trim();
    totalExpensesAmount = totalExpensesAmount - expenseInput.value
    expensesAmount.value = totalExpensesAmount ;
   getBalanceAmount();
   addBtn.onclick = function() {
    if(expenseInput.classList.contains('editing')){
        for(let i of expensesTable.querySelectorAll('td')){
            if(i.classList.contains('editing')){
                i.textContent = expenseInput.value;
                expenseInput.value = expenseInput.value
                i.classList.remove('editing');
                totalExpensesAmount= totalExpensesAmount + +expenseInput.value
                expensesAmount.value = totalExpensesAmount ;
                expenseInput.value = '';
                getBalanceAmount();
            }
        }
    }else{
        expenseInput.value = '';
    }
   };
}




//EventListeners
calculateBtn.addEventListener('click', function () {
    getBudget();

});
addBtn.addEventListener('click', function () {
    getTotalExpenses();

});