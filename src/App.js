import './App.css';
import fields from './Graph/board';
import { useEffect, useState } from 'react';
import Graph from './Graph';

function App() {
  const [board, setBoard] = useState({});

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
    Object.keys(fields).forEach(field => {
      if(fields[field].bomb){
        const myDiv = document.getElementById(`i${field}`);
        myDiv.style.backgroundImage = ;
      }
    })
  }

  const explodes = (e, field) => {
    e.preventDefault();
    board.BFS(field, (currentValue) => {
      if(fields[field].bomb){
        showBombs();
        return true;
      }
      else{
        console.log("eh pessoa");
        return false;
      }
    })
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
      <div className="board">
        {Object.keys(fields).map((field) => (
          <div className="field" id={`i${field}`} key={field} onClick={(e) => explodes(e, field)}/>
        ))}
        </div>
      </div>
  );
}

export default App;
