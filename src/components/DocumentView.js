import {useReadCypher} from 'use-neo4j';
import * as React from 'react';
import "./DocumentView.css";

const DocumentView = () => {
  const [view, setView] = React.useState("");
  //const query = `MATCH (p:Person) where p.id=$id`
  //const { loading, error, records, first } = useReadCypher(query, {id:e.data.id}, 'demo')
  //console.log("view:", first)

  React.useEffect(() => {
    function handleSelect(e) {
      if (e.data.type === 'InternalUrl') {
        if (e.data.hasOwnProperty("map")) {
          const p = JSON.parse(e.data.map)
          console.log("p", p)
          e.data.imageUrl = p.imageUrl ?? "/images/generic_person.png"
          e.data.name = p.name_givenName.split(",")[0] + " " + p.name_surname.split(",")[0]
          e.data.dob = p.birthDate
          e.data.id = p.tideId
        }

        console.log("ee:", e.data);
        setView(e.data);
      }
    }
    window.addEventListener('message', handleSelect); 
    return () => {
        window.removeEventListener('message', handleSelect);
    };
  });

  return (
    <div className="card">
      <img src={view.imageUrl ?? "/images/question.jpeg"} alt="Card" style={{"width":"100%"}}/>
      <div className="container">
        <h4><b>{view.item}</b></h4>
        <p>
          <span className="attributeName">ID:</span>
          <span className="attributeValue">{view.id}</span>
        </p>
        <p>
          <span className="attributeName">Name:</span>
          <span className="attributeValue">{view.name}</span>
        </p>
        <p>
          <span className="attributeName">DOB:</span>
          <span className="attributeValue">{view.dob}</span>
        </p>
      </div>
    </div>
     //<div id="doc">Item: {view.item}, Document: {view.id}</div>
  )
}

export default DocumentView;
