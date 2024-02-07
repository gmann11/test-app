import {useReadCypher} from 'use-neo4j';
import * as React from 'react';
import "./DocumentView.css";
import { WEBSQL } from 'localforage';

const DocumentView = () => {
  const [view, setView] = React.useState("");
  const noPerson = "/images/question.jpeg";
  const noPersonImage = "/images/generic_person.png";
  const query = `MATCH (p:Person) where id(p) = toInteger($id) RETURN p`
  let params = {"id":view.id ?? "00000000"}
  const { loading, error, records, first, run } = useReadCypher(query, params, 'demo')
  console.log("view:", view.id, "loading", loading, "first", first, "rec", records, "err:", error)
  if ( loading || first === undefined) {console.log("loading")}
  console.log("first:", first)

  React.useEffect(() => {
    console.log("view change:", view)
    if (view && view.id) {
      let params = { "id": view.id }
      run(params, 'demo')
    }
    function handleSelect(e) {
      if (e.data.type === 'InternalUrl') {
        if (e.data.hasOwnProperty("map")) {
          const p = JSON.parse(e.data.map)
          console.log("handleselect-p", p)
          e.data.imageUrl = p.imageUrl ?? noPersonImage
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
  }, [ view ]);

  return (
    <div className="card">
      <img src={ first?.get('p').properties.imageUrl ?? noPerson } alt="Card" style={{"width":"100%"}}/>
      <div className="container">
        <b>{first?.get('p').properties.name_givenName}&nbsp;{first?.get('p').properties.name_surname}</b>
        <div>
          <p>
            <span className="attributeName">ID:</span>
            <span className="attributeValue">{view.id}</span>
          </p>
          <p>
            <span className="attributeName">DOB:</span>
            <span className="attributeValue">{typeof first?.get('p').properties.birthDate}</span>
          </p>
          <p>
            <span className="attributeName">USP:</span>
            <span className="attributeValue">{first?.get('p').properties.usPerson}</span>
          </p>
          <p>
            <span className="attributeName">Gender:</span>
            <span className="attributeValue">{first?.get('p').properties.gender}</span>
          </p>
        </div>
      </div>
    </div>
     //<div id="doc">Item: {view.item}, Document: {view.id}</div>
  )
}

export default DocumentView;
