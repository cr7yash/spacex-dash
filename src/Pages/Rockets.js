import React from "react";
import { useQuery } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  Table,
  TableBody,
  Grid,
  Typography,
  Divider
} from "@material-ui/core";

import ROCKETS_DATA from "../Queries/RocketsQuery";
import Row from "../Components/Row";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 100,
    display: "flex",
    overflowX: "hide",
    paddingRight: 50,
    paddingLeft: 50
  },
  title: {
    display: "flex",
    marginTop: 70,
    justifyContent: "center"
  }
}));

export default function Rockets() {
  const classes = useStyles();

  const { loading, error, data } = useQuery(ROCKETS_DATA);
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Grid container>
      <Grid item xs={10} sm={12}>
        <Typography className={classes.title} variant="h4">
          Rocket{" "}
        </Typography>
        <Divider />
        <TableContainer className={classes.root} component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell align="right">Mass</TableCell>
                <TableCell align="right">Cost/Launch</TableCell>
                <TableCell align="right">Stages</TableCell>
                <TableCell align="right">Success Rate</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.rockets.map((row, index) => (
                <Row key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
