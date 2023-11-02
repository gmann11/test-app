import React, { useState } from "react";
import ReactDOM from 'react-dom'
import "./App.css";
import { Neo4jProvider, createDriver } from 'use-neo4j'

import BloomFrame from "./components/BloomFrame";
import PersonTable from "./components/PersonTable";

function App() {
  const [selectedRow, setSelectedRow] = useState("")
  return (
    <div className="grid-container">
      <PersonTable selectedRow={selectedRow} onSelect={setSelectedRow} />
      <BloomFrame selectedRow={selectedRow} />
    </div>
  );
}

export default App;

