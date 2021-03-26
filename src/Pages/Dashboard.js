import React from "react";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Paper,
  Card,
  CardActions,
  CardContent,
  Button,
  List,
  ListItem,
  Divider,
  ListItemText
} from "@material-ui/core";

import DASHBOARD_DATA from "../Queries/DashboardQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 100,
    marginTop: 70
  },
  title: {
    fontSize: 12
  },
  listRoot: {
    width: "100%",
    marginTop: 15,
    display: "block",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  header: {
    display: "flex",
    marginTop: 70,
    justifyContent: "center"
  }
}));
export default function Dashboard() {
  const classes = useStyles();

  const { loading, error, data } = useQuery(DASHBOARD_DATA);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className={classes.root}>
      <Typography className={classes.header} variant="h4">
        Dashboard{" "}
      </Typography>
      <Divider />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                {data.company.name}
              </Typography>
              <Typography variant="body2" color="secondary" gutterBottom>
                {data.company.summary}
              </Typography>
              <Typography variant="body2" color="textPrimary" gutterBottom>
                CEO:{" "}
                <span style={{ color: "#6a2c70" }}>{data.company.ceo}</span>
              </Typography>
              <Typography variant="body2" color="textPrimary" gutterBottom>
                Number of employees:
                <span style={{ color: "#6a2c70" }}>
                  {" "}
                  {data.company.employees}
                </span>
              </Typography>
              <Typography variant="body2" color="textPrimary" gutterBottom>
                Address:{" "}
                <span style={{ color: "#6a2c70" }}>
                  {data.company.headquarters.address}
                </span>
              </Typography>
              <Typography variant="body2" color="textPrimary" gutterBottom>
                City:
                <span style={{ color: "#6a2c70" }}>
                  {" "}
                  {data.company.headquarters.city}
                </span>
              </Typography>
              <Typography variant="body2" color="textPrimary" gutterBottom>
                State:
                <span style={{ color: "#6a2c70" }}>
                  {" "}
                  {data.company.headquarters.state}{" "}
                </span>
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                href={data.company.links.website}
                size="small"
                color="primary"
              >
                <Typography variant="button"> Website</Typography>
              </Button>
            </CardActions>
          </Card>
        </Grid>
        {/* Roadster */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                {data.roadster.name}
              </Typography>
              <Typography
                className={classes.title}
                variant="body2"
                color="secondary"
                gutterBottom
              >
                {data.roadster.details}
              </Typography>
              <Typography color="primaryText" gutterBottom>
                Distance from earth:{" "}
                <span style={{ color: "#6a2c70" }}>
                  {" "}
                  {new Number(data.roadster.earth_distance_km).toFixed(0)} Km
                </span>
              </Typography>
              <Typography color="primaryText" gutterBottom>
                Speed:{" "}
                <span style={{ color: "#6a2c70" }}>
                  {" "}
                  {new Number(data.roadster.speed_kph).toFixed(0)} Kph
                </span>
              </Typography>
              <Typography color="primaryText" gutterBottom>
                Date:
                <span style={{ color: "#6a2c70" }}>
                  {new Date(data.roadster.launch_date_utc).toLocaleDateString(
                    "en-US"
                  )}
                </span>
              </Typography>
              <Typography color="primaryText" gutterBottom>
                Weight:{" "}
                <span style={{ color: "#6a2c70" }}>
                  {" "}
                  {data.roadster.launch_mass_kg} Kg
                </span>
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                href={data.roadster.wikipedia}
                size="small"
                color="primary"
              >
                <Typography variant="button"> wikipedia</Typography>
              </Button>
            </CardActions>
          </Card>
        </Grid>
        {/* Launchpad information */}
        <Grid item className={classes.listRoot} xs={12} sm={4}>
          {data.launchpads.map((name, index) => {
            return (
              <List>
                <Paper>
                  <ListItem key={index}>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography color="primary">{name.name}</Typography>
                        </React.Fragment>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            variant="body2"
                            className={classes.inline}
                            color="secondary"
                          >
                            {name.details}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="fullWidth" component="li" />
                </Paper>
              </List>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}
