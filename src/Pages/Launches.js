import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";
import { DataGrid } from "@material-ui/data-grid";

import LAUNCHES_DATA from "../Queries/LaunchQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 70,
    marginTop: 70
  }
}));

export default function Launches() {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const { loading, error, data, fetchMore } = useQuery(LAUNCHES_DATA, {
    variables: { limit: 10, offset: 0 }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data?.launchesPastResult?.data);

  const rows = data?.launchesPastResult?.data.map((rowData, index) => ({
    id: index,
    LaunchDate: new Date(rowData.launch_date_utc).toLocaleDateString("en-US"),
    MissionName: rowData.mission_name,
    LaunchSite: rowData.launch_site.site_name,
    Rocket: rowData.rocket.rocket_name,
    Sucessful: rowData.launch_success
  }));

  const columns = [
    { field: "LaunchDate", headerName: "Launch Date", width: 150 },
    { field: "MissionName", headerName: "Mission Name", width: 150 },
    { field: "LaunchSite", headerName: "Launch Site", width: 150 },
    { field: "Rocket", headerName: "Rocket", width: 150 },
    { field: "Sucessful", headerName: "Sucessful", width: 150 }
  ];

  function handlePageChange(params) {
    console.log(params);
    console.log(params.page);
    console.log(params.pageSize);

    // fetchMore({
    //   variables: {
    //     offset: params.pageSize
    //   }
    // });
    setPage(params.page);
  }

  return (
    <div
      style={{
        display: "flex",
        paddingRight: 50,
        paddingLeft: 50,
        height: 400
      }}
    >
      <DataGrid
        autoHeight={true}
        className={classes.root}
        page={page}
        onPageChange={handlePageChange}
        rows={rows}
        columns={columns}
        pagination
        pageSize={10}
        rowCount={108}
        loading={loading}
        paginationMode="server"
      />
    </div>
  );
}
