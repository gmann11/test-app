# React Bloom Integration Example

This app demonstrates react/Bloom integration in an iframe.  It:
* Queries neo4j for a set of Person nodes showing nickName property
* Clicking on a name in left pane - runs a saved cypher in Bloom to display and Person and its nearest neighbors

## Setup

* Unzip Bloom assets into /bloom subdirectory in public dir (public/bloom)
* Edit public/discovery.json to specify host/port of Neo4j server
* Configure public/config/env-config.js as necessary
* Configure a saved cypher in Bloom as:
  `Document $id`
  `MATCH (d:TestDocument) WHERE e.id=$id return e`
* Make sure that TestDocument nodes have a property (name doesn't matter) with a valid uri matching this pattern: "http://localhost:3000/?srcdoc=XXXXXXX" where XXXXXXX is the id of the document.
* npm start

## Notes

* Authentication is hardcoded - react app and Bloom auth are both driven by the hardcoded env variables.

