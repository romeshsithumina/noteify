import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "react-bootstrap";

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <Button onClick={() => setCounter(counter + 1)}>
          Clicked {counter} times
        </Button>
      </header>
    </div>
  );
}

export default App;
