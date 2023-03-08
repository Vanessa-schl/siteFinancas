const form = document.getElementById('transaction-form');
const submitButton = document.getElementById('transaction-submit');

submitButton.addEventListener('click', function(event) {
  event.preventDefault();

  // Captura os valores dos campos do formulário
  const amountInput = document.getElementById('amount-input');
  const typeSelect = document.getElementById('type-select');
  const amount = Number(amountInput.value);
  const type = typeSelect.value;

  // Verifica se os valores dos campos são válidos
  if (isNaN(amount)) {
    alert('Por favor, informe um valor válido.');
    return;
  }

  // Armazena a transação no LocalStorage
  const transaction = {
    amount: amount,
    type: type
  };

  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  // Atualiza a tabela com o histórico de transações
  updateTransactionHistory();
});

function updateTransactionHistory() {
    const tableBody = document.querySelector('#transaction-history tbody');
    tableBody.innerHTML = '';
  
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  
    for (const transaction of transactions) {
      const row = document.createElement('tr');
      const dateCell = document.createElement('td');
      const amountCell = document.createElement('td');
      const typeCell = document.createElement('td');
  
      dateCell.textContent = new Date().toLocaleDateString();
      amountCell.textContent = transaction.amount;
      typeCell.textContent = transaction.type;
  
      row.appendChild(dateCell);
      row.appendChild(amountCell);
      row.appendChild(typeCell);
  
      tableBody.appendChild(row);
    }
  }
  
  // Chama a função para atualizar a tabela com o histórico de transações
  updateTransactionHistory();
  