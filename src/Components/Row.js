import React, { useState } from "react";
import {
  TableCell,
  TableRow,
  IconButton,
  Box,
  Collapse,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    }
  }
});

export default function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.mass.kg} kg</TableCell>
        <TableCell align="right">${row.cost_per_launch}</TableCell>
        <TableCell align="right">{row.stages}</TableCell>
        <TableCell align="right">{row.success_rate_pct}%</TableCell>
        <TableCell align="right">
          {row.active ? (
            <span style={{ color: "#54e346" }}> Active</span>
          ) : (
            <span style={{ color: "#be0000" }}>Inactive</span>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography color="primary" variant="h5">
                Rocket Details
              </Typography>
              <Typography variant="body1">{row.description}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
