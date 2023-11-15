import {useReadCypher} from 'use-neo4j';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Styles from './PersonTable.css';
import { getDynamicConfigValue, config } from "../dynamicConfig";

const DocumentTable = ({selectedRow, onSelect}) => {
  console.log("SelRow:", selectedRow, "onSel:", onSelect);
  console.log("onSel:", onSelect);
  const query = `MATCH (p:TestDocument) RETURN p limit 20`
  const { loading, error, records, first } = useReadCypher(query, {}, 'demo')
  if ( loading || first === undefined) return (<div>Loading...</div>)

  const styles = theme => ({
    tableRow: {
      "&$selected, &$selected:hover": {
        backgroundColor: "purple"
      }
    },
    tableCell: {
      "$selected &": {
        color: "yellow"
      }
    },
    hover: {},
    selected: {}
  });

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="dense table">
        <TableHead>
          <TableRow>
            <TableCell>Document</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((row) => (
            <TableRow key={row.get('p').properties.id} selected={selectedRow === row.get('p').properties.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={() => onSelect(row.get('p').properties.id)}>
              <TableCell component="th" scope="row">
                {row.get('p').properties.meta}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DocumentTable;
