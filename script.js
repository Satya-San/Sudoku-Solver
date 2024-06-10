document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("sudoku-grid");
    const solveButton = document.getElementById("solve-button");

    // Create 9x9 grid of input elements
    for (let i = 0; i < 81; i++) {
        const input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("min", "1");
        input.setAttribute("max", "9");
        input.setAttribute("maxlength", "1");
        grid.appendChild(input);
    }

    solveButton.addEventListener("click", () => {
        const inputs = document.querySelectorAll("#sudoku-grid input");
        const puzzle = Array.from(inputs).map(input => input.value ? parseInt(input.value) : 0);
        const solution = solveSudoku(puzzle);

        if (solution) {
            inputs.forEach((input, i) => {
                input.value = solution[i];
            });
        } else {
            alert("No solution found!");
        }
    });
});

function solveSudoku(puzzle) {
    const size = 9;
    const boxSize = 3;

    function isValid(num, pos, puzzle) {
        const [r, c] = pos;

        // Check row
        for (let i = 0; i < size; i++) {
            if (puzzle[r * size + i] === num && i !== c) {
                return false;
            }
        }

        // Check column
        for (let i = 0; i < size; i++) {
            if (puzzle[i * size + c] === num && i !== r) {
                return false;
            }
        }

        // Check box
        const boxRowStart = Math.floor(r / boxSize) * boxSize;
        const boxColStart = Math.floor(c / boxSize) * boxSize;

        for (let i = boxRowStart; i < boxRowStart + boxSize; i++) {
            for (let j = boxColStart; j < boxColStart + boxSize; j++) {
                if (puzzle[i * size + j] === num && (i !== r || j !== c)) {
                    return false;
                }
            }
        }

        return true;
    }

    function solve() {
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (puzzle[r * size + c] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(num, [r, c], puzzle)) {
                            puzzle[r * size + c] = num;

                            if (solve()) {
                                return true;
                            }

                            puzzle[r * size + c] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    return solve() ? puzzle : null;
}
