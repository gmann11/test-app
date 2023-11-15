import {useReadCypher} from 'use-neo4j';
import * as React from 'react';

const DocumentView = () => {
  const [view, setView] = React.useState("");

  React.useEffect(() => {
    function handleSelect(e) {
      if (e.data.type === 'InternalUrl') {
        console.log('selected: ', e);
        setView(e.data.url.split('=')[1]);
      }
    }

    window.addEventListener('message', handleSelect); 
  });

  return (
     <div id="doc">Document: {view}</div>
  )
}

export default DocumentView;
