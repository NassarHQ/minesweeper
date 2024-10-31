import React from "react";
import Cell from "./Cell";
import { useState } from "react";

function MinesweeperBoard() {
     // State ti store user inputs for rows and columns
     const [numRows, setNumRows] = useState(5); // Default row value
     const [numCols, setNumCols] = useState(5); // Default col value
     const [board, setBoard] = useState([]); // Stores the board generated
   
     function makeBoard() {
        console.log("Generating board with ", numRows, " rows and ",
            numCols, " columns");
        generateBoard(numRows, numCols); // Call generateBoard function
    }

    // Function to generate the board
    function generateBoard(numRows, numCols) {
        const newBoard = Array.from({ length: numRows }, () =>
            Array.from({ length: numCols }, () => ({
                isMine: false,
                isRevealed: false,
                adjacentMines: 0,
            }))
        );
    
        // Place mines
        const numMines = Math.floor(numRows * numCols * 0.2);
        let minesPlaced = 0;
    
        while (minesPlaced < numMines) {
            const row = Math.floor(Math.random() * numRows);
            const col = Math.floor(Math.random() * numCols);
    
            if (!newBoard[row][col].isMine) {
                newBoard[row][col].isMine = true;
                minesPlaced++;
            }
        }
    
        // Calculate adjacent mines
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                if (!newBoard[row][col].isMine) {
                    newBoard[row][col].adjacentMines = countAdjacentMines(newBoard, row, col);
                }
            }
        }
        
        // Set a new board
        setBoard(newBoard);
    }
    
    // Function to count the number of mines around a specific cell
    function countAdjacentMines(board, row, col) {
        // Define all possible directions for adjacent cells (total 8)
        const directions = [
            [-1, -1], [-1, 0], [-1, 1], // Top-Left, Top, Top-Right
            [0, -1],           [0, 1],  // Left, Right
            [1, -1],  [1, 0],  [1, 1]   // Bottom-Left, Bottom, Bottom-Right
        ];

        // Initialize a counter to keeo track of number of mines found
        let mineCount = 0;

        // Iterate over each direction to check the neighboring cells
        directions.forEach(([dr, dc]) => {
            // Calculate the new row and column indexes for the adjacent cell
            const newRow = row + dr;
            const newCol = col + dc;

            // Check if the new row and column are within the board boundaries
            if (
                newRow >= 0 && newRow < board.length &&
                newCol >= 0 && newCol < board[0].length &&
                board[newRow][newCol].isMine
            ) {
                // If the neighboring cell is within bounds and contains a mine
                // Increment mine
                mineCount++;
            }
        });

        // Return the total number of mines found around the given cell
        return mineCount;
    }

    // Function to hanle clicks from user
    function handleCellClick(row, col) {
        if (board[row][col].isRevealed) return; // Don't reveal an already revealed cell

        // Deep copy of the board
        const newBoard = board.map(row => row.map(cell => ({ ...cell})));

        if (newBoard[row][col].isMine) {
            // Game over logic - reveal all mines
            console.log("Game Over! You stepped on a mind.");
            newBoard.forEach(row => row.forEach(cell => { cell.isRevealed = true }));
        } else {
            // Reveal this cell
            newBoard[row][col].isRevealed = true;
        }

        // Update board state
        setBoard(newBoard);
    }

    return (
        <div className = "minesweeper-board">
            <h2>Customize Your Minesweeper Board</h2>

            {/* Input fields for rows and columns */}
            <label>
                Number of Rows:
                <input 
                    type="number"
                    value={numRows}
                    onChange={(e) => setNumRows(e.target.value ? Number(e.target.value) : "")}
                />
            </label>

            <label>
                Number of Columns:
                {/* FIX THE COLUMN DOES NOT WANT TO REMOVE THE 0 */}
                <input 
                    type="number"
                    value={numCols}
                    onChange={(e) => setNumCols(e.target.value ? Number(e.target.value) : "")}
                />
            </label>

            {/* Button to generate the board */}
            <button onClick={makeBoard}>Generate Board</button>

            {/* Render the grid of cells */}
            <div
            className="board-grid"
            style={{ gridTemplateColumns: `repeat(${numCols}, 40px)` }}
            >
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => (
                            <Cell // Render the Cell component
                                key={colIndex}
                                isClicked={cell.isRevealed} // Pass the cell's state
                                isMine={cell.isMine}
                                adjacentMines={cell.adjacentMines}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MinesweeperBoard;