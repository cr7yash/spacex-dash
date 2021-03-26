import { gql } from "@apollo/client";

const LAUNCHES_DATA = gql`
  query GetLaunchesData($offset: Int!, $limit: Int!) {
    launchesPastResult(offset: $offset, limit: $limit) {
      data {
        launch_date_utc
        mission_name
        launch_site {
          site_name
        }
        rocket {
          rocket_name
        }
        launch_success
      }
    }
  }
`;

export default LAUNCHES_DATA;
