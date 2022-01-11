import React from "react";
import {
  Paper,
  TableContainer,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Table,
} from "../material";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  useRecoilValue,
} from "recoil";

import * as state from "../state";

const useStyles = makeStyles((theme) => ({
  chony: { width: "100%" },
  tableContainer: { maxHeight: 650 },
  pre: { whiteSpace: "nowrap" },
  veryDense: {
    "& td": { paddingTop: 2, paddingBottom: 2 },
    "& th": { paddingTop: 2, paddingBottom: 2 },
  },
  bar: {
    transition: "width 0.5s",
    borderRadius: 4,
  },
}));

export default function CalcTable() {
  let sample = useRecoilValue(state.sample);
  const theme = useTheme();
  const classes = useStyles();
  return (
    <>
      {sample.map((table, idx) => (
        <TableContainer
          key={idx}
          component={Paper}
          className={classes.tableContainer}
        >
          <Table aria-label="simple table" stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>Value</TableCell>
                <TableCell align="center">%</TableCell>
                <TableCell align="center" className={classes.chony}>
                  {table.name}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {table.entries.map((row, rowid) => (
                <TableRow key={row.name} className={classes.veryDense}>
                  <TableCell
                    key={rowid}
                    component="th"
                    scope="row"
                    className={classes.pre}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.uv.toFixed(2)}%</TableCell>
                  <TableCell align="left">
                    <div
                      className={classes.bar}
                      style={{
                        display: "inline-block",
                        width: `${row.uv}%`,
                        lineHeight: 1.3,
                        backgroundColor: theme.palette.text.primary,
                      }}
                    >
                      &nbsp;
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </>
  );
}
