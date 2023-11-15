import React, { useState } from "react";
import ReactDOM from 'react-dom'
import "./App.css";
import { Neo4jProvider, createDriver } from 'use-neo4j'

import BloomFrame from "./components/BloomFrame";
import DocumentTable from "./components/DocumentTable";
import DocumentView from "./components/DocumentView";

function App() {
  const [selectedRow, setSelectedRow] = useState("")
  //const [selectedView, setSelectedView] = useState("")
  return (
    <div className="grid-container">
      <div className="a">
        <DocumentTable selectedRow={selectedRow} onSelect={setSelectedRow} />
      </div>
      <div className="b">
        <BloomFrame selectedRow={selectedRow} />
      </div>
      <div className="c">
        <DocumentView />
      </div>
    </div>
  );
}

export default App;

