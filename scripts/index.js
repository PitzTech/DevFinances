import Modal from "./modal.js"
import Format from "./utils/format.js"

const modal = Modal({ animateClasses: ['animate-pop', 'back'] })

const newButton = document.querySelector("#transaction .button.new")

newButton.addEventListener("click", modal.open)

// ---------------
//    INTERFACE
// ---------------

const transactions = [
    {
        description: "Luz",
        amount: -50000,
        date: "23/01/2021"
    },
    {
        description: "Website",
        amount: 500000,
        date: "23/01/2021"
    },
    {
        description: "Internet",
        amount: -20000,
        date: "23/01/2021"
    },
    {
        description: "App",
        amount: -200000,
        date: "23/01/2021"
    },
]

const Transaction = {
    all: transactions,
    incomes() {
        let income = 0
        Transaction.all.forEach(transaction => {
            if(transaction.amount > 0)
                income += transaction.amount
        })
        return income
    },
    expenses() {
        let expenses = 0
        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0)
                expenses += transaction.amount
        })
        return expenses
    },
    total() {
        return Transaction.incomes() + Transaction.expenses()
    }
}

const DOM = {
    transactionsContainer: document.querySelector("#data-table tbody"),
    addTransaction(transaction, index) {
        const tr = document.createElement("tr")
        tr.innerHTML = DOM.htmlTransactions(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    htmlTransactions(transaction) {
        
        const cssClass = transaction.amount > 0 ? "income" : "expense"
        
        const amount = Format.currency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${cssClass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="/images/minus.svg" alt="Remover Transação">
            </td>
            <!--   End Row   -->
        `

        return html
    },
    updateBalance() {
        const income =  document.querySelector("#incomeDisplay p")
        const expense =  document.querySelector("#expenseDisplay p")
        const total =  document.querySelector("#totalDisplay p")
    
        income.innerHTML = Format.currency(Transaction.incomes())
        expense.innerHTML = Format.currency(Transaction.expenses())
        total.innerHTML = Format.currency(Transaction.total())
    },
}

const App = {
    init() {
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })
        DOM.updateBalance()
    },
}

App.init()
