import { useState } from 'react';
import './App.css';

function Square({values, onSquareClick}){
  return(
    <button className='buttonoption' onClick={onSquareClick}>{values}</button>
  );
}

function CalculateWinner(squares){
  const ways = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for(let i = 0; i < ways.length; i++){
    const[a,b,c] = ways[i];
    if(squares[a] && (squares[a] === squares[b]) && (squares[a] === squares[c])){
      return squares[a];
    }
  }
  return null;
}

function reset(){
  window.location.reload(false);
}

export default function App(){
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  let winner = CalculateWinner(squares);
  let status;
  const [count, setCount] = useState(0);

  function handleClick(i){
    const nextSquares = squares.slice();
    let counter=0;
    if(squares[i] || CalculateWinner(squares)){
      return;
    }

    if(xIsNext){
      nextSquares[i] = "X";
      counter++;
    }
    else{
      nextSquares[i] = "O";
      counter++;
    }
    setCount(count+counter);
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  if(winner !== null){
    status = "WINNER: "+ winner;
  }
  else{
    if(count === 0){
      status = "FIRST MOVE: X";
    }
    else if(count === 9 && winner === null){
      
      status = "DRAW";
    }
    else{
      status = (xIsNext) ? "NEXT MOVE: X" : "NEXT MOVE: O" ;
    }
  }
  return(
    <>
    <div className='flex'>
      <div className='status'>
        <div>
        <b className='b'>{status}</b>
        </div>
        <div>
      <button onClick={() =>reset()} className='btn'><b>RESET</b></button>
      </div>
      </div>
      
      <div>
        <Square values={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square values={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square values={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div>
        <Square values={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square values={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square values={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div>
        <Square values={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square values={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square values={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>

    </div>  
    </> 
  );
}

