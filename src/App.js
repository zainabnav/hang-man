import React, {useState, useEffect} from "react"

const HangmanFigure=({incorrectGuesses})=>{
  return (
    <div className="hangman-figure m-4">
      {incorrectGuesses >= 1 && <div className="head">O</div>}
      {incorrectGuesses >= 2 && <div className="body"></div>}
      {incorrectGuesses >= 3 && <div className="left-arm">/|\</div>}
      {incorrectGuesses >= 4 && <div className="right-arm"> |</div>}
      {incorrectGuesses >= 5 && <div className="left-leg"></div>}
      {incorrectGuesses >= 6 && <div className="right-leg">/\</div>}
    </div>
  );
  
}

function App() {
  const words = ["REACT", "JAVA", "PYTHON", "SWIFT", "JAVASCRIPT", "TAILWIND"];
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  
 const gameStart=()=>{
  const randomWord= words[Math.floor(Math.random()*words.length)];
  setTargetWord(randomWord);
  setGuesses([]);
  setIncorrectGuesses(0);
 };

React.useEffect(() => {
      gameStart();
    }, []);
  
const handleGuess=(letter)=>{
if(!targetWord.includes(letter)){
  setIncorrectGuesses((prev)=>prev+1)
}
setGuesses((prev)=>[...prev, letter])
}

const displayWord=targetWord.split("").map((letter)=>(guesses.includes(letter)? letter: "___ ")).join("");

 const isGameOver = incorrectGuesses >= 6;
  const isWinner = !displayWord.includes("_");


  return (
    <div className="flex flex-wrap justify-center items-center">
      <header>
        <div className="flex flex-col h-[100vh] items-center justify-center">
        <h1 className= "text-bg-slate-700 font-bold mb-2">HANGMAN!</h1>
        <HangmanFigure incorrectGuesses={incorrectGuesses} />
        {isWinner && (<h2 className= "text-bg-slate-700 font-bold">Congratulations! You Win The Game</h2>)}
  {isGameOver && (<h2 className= "text-bg-slate-700 font-bold"> GameOver! The Word was : <span className="text-red-600 font-bold">{targetWord}</span></h2>)}
  <p className="m-2 p-3">{displayWord}</p>
   <div className="keyboard w-48 md:w-100 lg:w-100">
  {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter)=>(
  <button 
    key={letter}
    onClick={()=> handleGuess(letter)}
    disabled={guesses.includes(letter)}
     className="bg-slate-800 text-white font-bold h-[20px] w-[30px] items-center justify-center text-center mb-2 mx-1 hover:bg-slate-300 hover:text-slate-900">{letter}</button>
  ))}
</div>
  <button className="bg-slate-700 text-white font-bold p-1 rounded-lg hover:bg-yellow-500 hover:text-slate-900 m-2" onClick={gameStart}>RESTART</button>
      </div>
       </header>
    </div>
  );
}



export default App;











