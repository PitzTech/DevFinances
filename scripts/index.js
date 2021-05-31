import Modal from "./modal.js"
import Format from "./utils/format.js"

const modal = Modal({ animateClasses: ['animate-pop', 'back'] })

const newButton = document.querySelector("#transaction .button.new")

newButton.addEventListener("click", modal.open)

// cookies
const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },
    set(transactions) {
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}


const Transaction = {
    all: Storage.get(),
    add(transaction){
        Transaction.all.push(transaction)
        
        App.reload()
    },
    remove(index) {
        Transaction.all.splice(index, 1)
        
        App.reload()
    },
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
// making Transaction available to index.html
window.Transaction = Transaction

const DOM = {
    transactionsContainer: document.querySelector("#data-table tbody"),
    addTransaction(transaction, index) {
        const tr = document.createElement("tr")
        tr.innerHTML = DOM.htmlTransactions(transaction, index)
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)
    },
    htmlTransactions(transaction, index) {
        
        const cssClass = transaction.amount > 0 ? "income" : "expense"
        
        const amount = Format.currency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${cssClass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img class="remove-btn" onclick="Transaction.remove(${index})" src="/images/minus.svg" alt="Remover Transação">
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
    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Form = {
    description: document.querySelector("input#description"),
    amount: document.querySelector("input#amount"),
    date: document.querySelector("input#date"),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },
    validateFields() {
        const { description, amount, date } = Form.getValues()

        if(description.trim() === "" 
            || amount.trim() === "" 
            || date.trim() === ""){
                throw new Error("Por favor, preencha todos os campos")
            }
    },

    formatValues() {
        let { description, amount, date } = Form.getValues()
        amount = Format.amount(amount)
        date = Format.date(date)

        return {
            description,
            amount,
            date
        }
    },

    clearFields(){
        Form.description
    },

    submit(event) {
        event.preventDefault()

        try {
            Form.validateFields()
            const transaction = Form.formatValues()
            
            //Save
            Transaction.add(transaction)

            //Clean Form
            document.querySelector("#form form").reset()

            modal.close()
        } catch (error) {
            alert(error.message)
        }

       
    }
}

const formElement = document.querySelector("#form form")
formElement.addEventListener("submit", Form.submit)

const App = {
    init() {
        Transaction.all.forEach(DOM.addTransaction)

        DOM.updateBalance()

        Storage.set(Transaction.all)
    },
    reload() {
        DOM.clearTransactions()
        App.init()
    }
}

App.init()

