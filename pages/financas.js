// let form  = document.getElementById('transaction-form');
// let submitButton = document.getElementById('transaction-submit');

// submitButton.addEventListener('click', function(event){
//     event.preventDefault();

// let amountInput = document.getElementById('amount-input');
// let typeSelect = document.getElementById('type-select');
// let amount = Number(amountInput.value);
// let type = typeSelect.value;

// if(isNaN(amount)){
//     alert('Por favor, informe um valor válido.');
//     return;
// }

// let transaction = {
//     amount: amount,
//     type: type
// };

// let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
// transactions.push(transaction);
// localStorage.setItem('transactions', JSON.stringify(transactions));

// updateTransactionHistory();
// });

// function updateTransactionHistory(){
//     let tableBody = document.querySelector('#transaction-history tbody');
//     tableBody.innerHTML = '';

//     let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// for (let transaction of transactions){
//     let row = document.createElement('tr');
//     let amountCell = document.createElement('td');
//     let typeCell = document.createElement('td');

//     amountCell.textContent = transaction.amount;
//     typeCell.textContent = transaction.type;
    
//     row.appendChild(amountCell);
//     row.appendChild(typeCell);

//     tableBody.appendChild(row);
    
// } 
// }

// updateTransactionHistory();





// Criação de variáveis globais
let transactionHistory = [];

const amountInput = document.getElementById("amount-input");
const typeSelect = document.getElementById("type-select");
const transactionForm = document.getElementById("transaction-form");
const transactionTableBody = document.querySelector("#transaction-history tbody");
const totalCard = document.querySelector(".card3 div p.total");
const incomeCard = document.querySelector(".card1 div p.entrada");
const expenseCard = document.querySelector(".card2 div p.saida");

// Função para salvar a transação no localStorage
function saveTransactionToLocalStorage(transaction) {
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Função para excluir a transação do localStorage
function deleteTransactionFromLocalStorage(index) {
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions.splice(index, 1);
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Função para atualizar a tabela de histórico de transações
function updateTransactionTable(transaction) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
        <div class="botaozinho">
        <td class="classTD">${transaction.amount}</td>
        <td class="classTD">${transaction.type}</td>
        <td><button class="delete-btn">Excluir</button></td>
        </div>
    `;

  transactionTableBody.appendChild(tr);
}

// Função para atualizar os cards com os totais
function updateTotalCard() {
  let total = 0;
  let income = 0;
  let expense = 0;

  transactionHistory.forEach((transaction) => {
    total += transaction.amount;
    if (transaction.type === "Entrada") {
      income += transaction.amount;
    } else {
      expense += transaction.amount;
    }
  });

  totalCard.textContent = `R$ ${total.toFixed(2)}`;
  incomeCard.textContent = `R$ ${income.toFixed(2)}`;
  expenseCard.textContent = `R$ ${expense.toFixed(2)}`;
}

// Função para carregar as transações do localStorage
function loadTransactions() {
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  transactions.forEach((transaction) => {
    transactionHistory.push(transaction);
    updateTransactionTable(transaction);
  });

  updateTotalCard();
}

// Evento para excluir a transação da tabela e do localStorage
transactionTableBody.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const index = Array.from(transactionTableBody.children).indexOf(
      event.target.parentElement.parentElement
    );

    deleteTransactionFromLocalStorage(index);
    transactionHistory.splice(index, 1);
    event.target.parentElement.parentElement.remove();
    updateTotalCard();
  }
});

// Evento para adicionar a transação na tabela e no localStorage
transactionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const transaction = {
    amount: parseFloat(amountInput.value),
    type: typeSelect.value,
  };

  transactionHistory.push(transaction);
  saveTransactionToLocalStorage(transaction);
  updateTransactionTable(transaction);
  updateTotalCard();

  amountInput.value = "";
});

// Chamada da função para carregar as transações do localStorage
loadTransactions();




  



