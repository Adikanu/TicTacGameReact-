import  React from 'react';

function Board(){

    const [squares , setSquare ] =  React.useState(
      () =>
        JSON.parse(window.localStorage.getItem('square')) ||
        Array(9).fill(null)
        );

    const nextValue = calculateNextValue(squares);
    const winner = calculateWinner(squares);
    const status = calculateStatus(winner , squares , nextValue);

    React.useEffect(() => {
      window.localStorage.setItem('square' , JSON.stringify(squares))
    }, [squares])

    function selectSquare(square){
        if(winner || squares[square]){
            return
        }

        const squareCopy = [...squares]
        squareCopy[square] = nextValue
        setSquare(squareCopy)
    }


    function restart(){

        setSquare(Array(9).fill(null))
    }

    function renderSquare(i){
        return (
            <button className="square" onClick={() => selectSquare(i)}>
                {squares[i]}
             </button>
        )
    }

    function calculateStatus(winner , squares , nextValue) {
        return winner
        ? `Winner: ${winner}`
        : squares.every(Boolean)
        ? `Scratch: Cat's game`
        : `Next player: ${nextValue}`
    }

    // eslint-disable-next-line no-unused-vars
    function calculateNextValue(squares) {
        const xSquaresCount = squares.filter(r => r === 'X').length
        const oSquaresCount = squares.filter(r => r === 'O').length
        return oSquaresCount === xSquaresCount ? 'X' : 'O'
    }

    function calculateWinner(squares){
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        for(let i = 0 ; i < lines.length; i++){

            const [ a , b , c] = lines[i];

            if(squares[a] && squares[a] === squares[b] &&  squares[a] === squares[c]){
                return squares[a]
            }
        }
        return null
    }

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <button className="restart" onClick={restart}>
                restart
            </button>
        </div>
    )
}


export default Board;