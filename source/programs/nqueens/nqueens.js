/**
Recursive n-queens solver
unused is an array of yet unused col indices
board is an array of col indices, one for each row
*/
function nQueens(unused, board, row, n)
{
    //print('nQueens row=' + row + ', n=' + n);

    // If we are past the end of the board, we have found a solution
    if (row >= n)
        return 1;
    
    /*
    print('unused:');
    for (var i = 0; i < unused.length; ++i)
        print(unused[i]);
    */

    // Number of solutions found recursively
    var numSolns = 0;

    // For each unused column index
    for (var i = 0; i < unused.length; ++i)
    {
        var col = unused[i];
        
        var safe = true;
        
        // For each row before the current one
        for (var r = 0; r < row; ++r)
        {
            // If there is a queen in the diagonals
            if (col === board[r] + (row - r) || col === board[r] - (row - r))
            {
                safe = false; 
                break;
            }
        }
        
        // If we can place the queen at this position
        if (safe)
        {
            var newBoard = [];
            for (var j = 0; j < board.length; ++j)
                newBoard[j] = board[j];

            newBoard[row] = col;
            
            //print('placing queen at row ' + row + ' col ' + col);

            var newUnused = [];
            for (var j = 0; j < unused.length; ++j)
                if (unused[j] !== col)
                    newUnused[newUnused.length] = unused[j];

            numSolns += nQueens(newUnused, newBoard, row + 1, n);
        }
    }

    // Return the number of solutions found recursively
    return numSolns;
}

function countSolns(n)
{
    //print('in countSolns()');

    // All columns are initially unused
    var unused = [];
    for (var i = 0; i < n; ++i)
        unused[unused.length] = i;

    // The board is initially empty
    var board = [];
    
    var numSolns = nQueens(unused, board, 0, n);

    return numSolns;
}

function printBoard(board)
{
    for (var i = 0; i < board.length; ++i)
    {
        var rowStr = '';

        for (var j = 0; j < board.length; ++j)
        {
            if (board[i] === j)
                rowStr += 'X';
            else
                rowStr += ' ';

            if (j != board.length - 1)
                rowStr += ',';
        }

        print(rowStr);
    }
}

function test()
{
    //print('in test()');

    if (countSolns(2) !== 0)
        return 1;

    //print('ok 2');

    if (countSolns(3) !== 0)
        return 1;

    //print('ok 3');

    if (countSolns(4) !== 2)
        return 1;

    //print('ok 4');

    return 0;
}

//print(test());
