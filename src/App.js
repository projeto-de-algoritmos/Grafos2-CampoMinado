import './App.css';
import fields from './Graph/board';
import { useEffect, useState } from 'react';
import Graph from './Graph';

function App() {
  const [board, setBoard] = useState({});
  const [bombs, setBombs] = useState(0);
  const [emptyFields, setEmptyFields] = useState(0);

  const createGraph = () => {
    const graph = new Graph();

    Object.keys(fields).forEach(field => {
      graph.addNode(field);
    });

    Object.keys(fields).forEach(field => {
      fields[field].connected.forEach(connection => {
        graph.addEdge(field, connection);
      });
    });

    return graph;
  }
  
  useEffect(() => {
    const grafo = createGraph();
    setBoard(grafo);
  }, []);

  const showBombs = () => {
    setBombs(20);
    Object.keys(fields).forEach(field => {
      if(fields[field].bomb){
        const myDiv = document.getElementById(`i${field}`);
        myDiv.style.background = "#FF0000 url('bomb.svg') no-repeat center";
      }
    });
    const boardDiv = document.getElementsByClassName("board");
    boardDiv[0].addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
    }, true)
  }

  const explodes = (field) => {
    board.BFS(field, (currentValue) => {
      if(fields[currentValue].bomb){
        showBombs();
        return true;
      }
      else{ 
        var remainField = emptyFields+1;
        setEmptyFields(remainField);
        console.log(remainField);
        const myDiv = document.getElementById(`i${currentValue}`);
        myDiv.style.background = "#2ed133"
        myDiv.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
        }, true);
        return false;
      }
    });
  }

  const handleResult = () => {
    if(bombs === 20){
      return 'As bombas explodiram';
    }
    else if(emptyFields === 16){
      return 'Voce ganhou!!'
    }
    else{
      return '...';
    }
  }
  return (
    <div className="App">
      <h1>Campo <span id="red">Minado</span></h1>
      <p>
        Campo minado de componentes fortemente conectados!!!
        É um pouco mais dificil pelo fato de não mostrar onde estão as bombas e nem quantas tem perto.
        Como foi dito, existem diversos componentes fortemente conectados dentro do <span id="risk">grafo</span> campo minado.
        Como é de se esperar, as bombas também são componentes fortemente conectados. Boa sorte!
      </p>
      <div className="content">
        <div>
          <h1>{handleResult()}</h1>
        </div>
        <div className="board">
          {Object.keys(fields).map((field) => (
            <div className="field" id={`i${field}`} key={field} onClick={() => explodes(field)} />
          ))}
          </div>
          <div>
            <button onClick={() => {window.location.reload()}}>Reset</button>
          </div>
        </div>
        
      </div>
      
  );
}

export default App;
