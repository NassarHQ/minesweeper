import React from "react";

function Cell({ isClicked, onClick, isMine, adjacentMines }) {
    return (
        <div 
        className={`cell ${isClicked ? 'revealed' : ""}
        ${isMine ? "mine" : ""}`} 
        onClick={onClick}>

             {/* Display a mine if it's a mine, else display the count of adjacent mines if > 0 */}
            {isClicked && (isMine ? '💣' : adjacentMines > 0 ? adjacentMines : "")}
        </div>
    );
}

export default Cell;