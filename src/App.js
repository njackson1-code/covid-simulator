import React from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './person.js';
import Plot from './plot.js';
import Create from './create.js';

function App() {
  
  
  
  return (
    <><div id = "overshadow"></div>
      <div className="App">
        <div id = "title">
          Covid Visualizer
        </div>

        <div id = "topBox">
          <div id = "inputs">
            <div id = "people">
              <input id = "numPeople" placeholder="100"></input>
              <label>Number of People</label>
            </div>
            
            <div id = "socialDistance">
              <input type="range" placeholder="Social Distancing" id ="sd" name="cowbell" min="0" max="100"></input>
              <label for="cowbell">Level of Social Distancing</label>
            </div>
            

            <div>
              <input id = {"masks"} type="checkbox"></input>
              <label>Masks</label>
            </div>
            
          </div>

          <div id = "generate">
              <button id="GenerateSimulation">Generate Simulation</button>
          </div>
          <div id = "reset">
              <button id="ResetSimulation">Reset Simulation</button>
          </div>
        </div>
        
        <Create />

        <div id = "bottomBorder">
          <div id = "negativeCovid">
            Negative
          </div>

          <div id = "positiveCovid">
            Positive
          </div>

          <div id = "recoveredCovid">
            Recovered
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
