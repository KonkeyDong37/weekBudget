// Classes

class Budget {
    constructor(budget) {
        this.budget = Number(budget);
        this.budgetLeft = this.budget;
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
        }, 3000);
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

        }
    })
}