# Minesweeper Game
A sample project of using Github Copilot to create an html game from scratch.
This project is a simple implementation of the classic Minesweeper game using HTML, CSS, and JavaScript.

## Project Structure
The project consists of three main files:

- index.html: This is the main HTML file that contains the structure of the game. It includes a minefield area, a message box for game status, a dropdown for selecting the number of mines, and a button to start a new game.

- minesweeper.css: This file contains the CSS styles for the game. It defines styles for the minefield grid, individual cells, and different cell states (mine, flag, revealed).

- minesweeper.js: This is the main JavaScript file that contains the game logic. It includes functions for creating a new game, generating mines, creating the minefield, updating adjacent cells, checking if the game is over, revealing cells, flagging cells, and printing the game status.

## How to Play
Select the number of mines you want in the game from the dropdown.
Click the "Start New Game" button to start a new game.
Left-click on a cell to reveal it. If the cell is a mine, the game is over. If the cell is not a mine, it will show the number of adjacent cells that contain mines.
Right-click on a cell to flag it as a mine.
The game is won when all non-mine cells are revealed.

## Running the Project
To run the project, simply open the index.html file in a web browser.
