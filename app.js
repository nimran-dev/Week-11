
$(document).ready(function() {
    // Initialize the current player to 'X'
    let currentPlayer = 'X';
    
    // Select all cells with the data-cell attribute
    const cells = $('[data-cell]');
    
    // Select the turn indicator element
    const turnIndicator = $('#turn-indicator');
    
    // Select the alert container element
    const alertContainer = $('#alert-container');
    
    // Select the restart button element
    const restartButton = $('#restart-button');

    // Function to check for a winner or a draw
    function checkWinner() {
        // Define all possible winning combinations
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        // Loop through each winning combination
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            // Check if the cells in the combination are not empty and have the same text
            if (cells.eq(a).text() && cells.eq(a).text() === cells.eq(b).text() && cells.eq(a).text() === cells.eq(c).text()) {
                return cells.eq(a).text(); // Return the winner ('X' or 'O')
            }
        }
        // Check if all cells are filled and return 'Draw' if true, otherwise return null
        return cells.toArray().every(cell => $(cell).text()) ? 'Draw' : null;
    }

    // Function to handle cell click events
    function handleClick() {
        // Check if the clicked cell is empty
        if ($(this).text() === '') {
            // Set the cell's text to the current player's symbol
            $(this).text(currentPlayer);
            // Check for a winner or a draw
            const winner = checkWinner();
            if (winner) {
                // Display the result in the alert container
                alertContainer.html(`<div class="alert alert-success">${winner === 'Draw' ? 'It\'s a Draw!' : `${winner} Wins!`}</div>`);
                // Remove click event listeners from all cells
                cells.off('click');
            } else {
                // Switch the current player
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                // Update the turn indicator text
                turnIndicator.text(`${currentPlayer}'s Turn`);
            }
        }
    }

    // Function to restart the game
    function restartGame() {
        // Clear the text of all cells and re-enable click event listeners
        cells.text('').on('click', handleClick);
        // Reset the current player to 'X'
        currentPlayer = 'X';
        // Update the turn indicator text
        turnIndicator.text(`${currentPlayer}'s Turn`);
        // Clear the alert container
        alertContainer.html('');
    }

    // Add click event listeners to all cells
    cells.on('click', handleClick);
    // Add click event listener to the restart button
    restartButton.on('click', restartGame);
});
