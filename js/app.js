// Classes

class Budget {
    constructor(budget) {
        this.budget = Number(budget);
        this.budgetLeft = this.budget;
    }

    // Substrack from the budget
    substractFromBudget(amount) {
        return this.budgetLeft -= amount;
    }
}

// Everything related to HTML
class HTML {

    //Inserts the budget when the user submit it
    insertBudget(amount) {
        budgetTotal.innerHTML = `${amount}`;
        budgetLeft.innerHTML = `${amount}`;
    }

    // Display a message (correct or invalid)
    printMessage(message, className) {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('text-center', 'alert', className);
        messageWrapper.appendChild(document.createTextNode(message));

        // Insert into HTML
        document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);

        // Clear the error
        setTimeout(() => {
            document.querySelector('.primary .alert').remove();
            addExpenseForm.reset();
        }, 3000);
    }

    // Displays the expenses from the form into the list
    addExpendsToList(name, amount) {
        const expensesList = document.querySelector('#expenses ul');

        // Create a li
        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        // Create the template
        li.innerHTML = `
            ${name}
            <span class="badge badge-primary badge-pill">${amount}</span>
        `

        // Insert into the HTML
        expensesList.appendChild(li);
    }

    // Subtract expense amount from budget
    trackBudget(amount) {
        const budgetLeftDollars = budget.substractFromBudget(amount);

        budgetLeft.innerHTML = `${budgetLeftDollars}`;

        // Check when 25% is spent
        if( (budget.budget / 4) > budgetLeftDollars ) {
            budgetLeft.parentElement.parentElement.classList.remove('alert-warning', 'alert-success');
            budgetLeft.parentElement.parentElement.classList.add('alert-danger');
        } else if ( (budget.budget / 2) > budgetLeftDollars ) {
            budgetLeft.parentElement.parentElement.classList.remove('alert-success');
            budgetLeft.parentElement.parentElement.classList.add('alert-warning');
        }
    }
}


// Variabless

const addExpenseForm = document.querySelector('#add-expense'),
      budgetTotal = document.querySelector('span#total'),
      budgetLeft = document.querySelector('span#left');

let budget, userBudget;

// Imstanciate the HTML CLASS
const html = new HTML()

// Eventlisteners
eventListeners();

function eventListeners() {

    // App init
    document.addEventListener('DOMContentLoaded', () => {
        // Ask the visitor the weekly budget
        userBudget = prompt(' What\'s your budget for this week? ');
        // Validate the userBudget
        if(userBudget === null || userBudget === '' || userBudget === '0') {
            window.location.reload();
        } else {
            // Budget is valid then instanciate the budget class
            budget = new Budget(userBudget)

            // Instanciate HTML Class
            html.insertBudget(budget.budget);
            
        }
    });

    // When a new expense is added
    addExpenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Reed the input values
        const expenseName = document.querySelector('#expense').value,
              amount = document.querySelector('#amount').value;

        if(expenseName === '' || amount === '') {
            html.printMessage('There was error, all the fields are mandatory',
            'alert-danger')
        } else {
            // Add the Expenses into the list
            html.addExpendsToList(expenseName, amount);
            html.trackBudget(amount);
            html.printMessage('Added...',
            'alert-success')
        }
    })
}