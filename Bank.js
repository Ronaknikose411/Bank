// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to buttons and elements in the DOM
    const depositBtn = document.getElementById('depositBtn'); // Button to handle deposits
    const withdrawBtn = document.getElementById('withdrawBtn'); // Button to handle withdrawals
    const balanceDisplay = document.getElementById('balance'); // Element to display current balance
    const transactionTable = document.getElementById('transactionTable'); // Table to display transaction history
    const recentUpdatesSection = document.querySelector('.recent-updates ul'); // Get the recent updates section

    // Initialize the current balance
    let currentBalance = 1000; // Initial balance

    // Get all buttons that open modals
    const functionButtons = document.querySelectorAll('.function-btn'); // All functional buttons
    const modals = document.querySelectorAll('.modal'); // All modal elements
    const closeModalButtons = document.querySelectorAll('.close-modal'); // Close buttons for modals

    // Add event listeners to open modals
    functionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal'); // Get the ID of the modal to open
            const modal = document.getElementById(modalId); // Get the modal element
            if (modal) {
                modal.style.display = 'block'; // Show the modal
            }
        });
    });

    // Add event listeners to close modals
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal'); // Get the ID of the modal to close
            const modal = document.getElementById(modalId); // Get the modal element
            if (modal) {
                modal.style.display = 'none'; // Hide the modal
            }
        });
    });

    // Handle deposit transactions
    depositBtn.addEventListener('click', () => {
        const amount = parseFloat(document.getElementById('depositAmount').value); // Get deposit amount from input
        if (amount > 0) { // Check if the amount is valid
            currentBalance += amount; // Update current balance
            updateBalance(); // Update balance display
            addTransaction('Deposit', amount); // Add transaction record
            clearInputs(); // Clear input fields
            addRecentUpdate(`Deposited $${amount.toFixed(2)} to your account.`); // Add recent update
        } else {
            alert('Please enter a valid amount to deposit.'); // Show alert for invalid input
        }
    });

    // Handle withdrawal transactions
    withdrawBtn.addEventListener('click', () => {
        const amount = parseFloat(document.getElementById('withdrawAmount').value); // Get withdrawal amount from input
        if (amount > 0 && amount <= currentBalance) { // Check if the amount is valid and sufficient
            currentBalance -= amount; // Update current balance
            updateBalance(); // Update balance display
            addTransaction('Withdrawal', amount); // Add transaction record
            clearInputs(); // Clear input fields
            addRecentUpdate(`Withdrew $${amount.toFixed(2)} from your account.`); // Add recent update
        } else {
            alert('Please enter a valid amount to withdraw or ensure sufficient funds.'); // Show alert for invalid input
        }
    });

    // Function to update the balance display
    function updateBalance() {
        balanceDisplay.innerText = currentBalance.toFixed(2); // Display the current balance formatted to 2 decimal places
    }

    // Function to add a transaction to the history table
    function addTransaction(type, amount) {
        const row = document.createElement('tr'); // Create a new table row
        const dateCell = document.createElement('td'); // Create a cell for the date
        const typeCell = document.createElement('td'); // Create a cell for the transaction type
        const amountCell = document.createElement('td'); // Create a cell for the transaction amount

        dateCell.innerText = new Date().toLocaleDateString(); // Set date cell to current date
        typeCell.innerText = type; // Set type cell to transaction type
        amountCell.innerText = `$${amount.toFixed(2)}`; // Set amount cell to formatted amount

        // Append cells to the row
        row.appendChild(dateCell);
        row.appendChild(typeCell);
        row.appendChild(amountCell);
        // Append the row to the transaction table
        transactionTable.appendChild(row);
    }

    // Function to clear input fields for deposit and withdrawal
    function clearInputs() {
        document.getElementById('depositAmount').value = ''; // Clear deposit input
        document.getElementById('withdrawAmount').value = ''; // Clear withdrawal input
    }

    // Function to add a recent update message
    function addRecentUpdate(message) {
        const updateItem = document.createElement('li'); // Create a new list item for the update
        updateItem.innerText = `${new Date().toLocaleTimeString()}: ${message}`; // Set the text of the update

        // Append the new update to the recent updates section
        recentUpdatesSection.appendChild(updateItem);

        // Optional: Highlight the recent update temporarily
        updateItem.classList.add('highlight-update'); // Add highlight class
        setTimeout(() => {
            updateItem.classList.remove('highlight-update'); // Remove highlight class after 3 seconds
        }, 3000); // Highlight duration
    }

    // Close modals when clicking outside of them
    window.addEventListener('click', (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none'; // Hide the modal if clicked outside
            }
        });
    });
});
