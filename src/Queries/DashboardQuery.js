import { gql } from "@apollo/client";

const DASHBOARD_DATA = gql`
  query GetDashboardData {
    company {
      name
      summary
      ceo
      headquarters {
        address
        city
        state
      }
      employees
      links {
        website
      }
    }
    roadster {
      name
      details
      earth_distance_km
      speed_kph
      launch_date_utc
      launch_mass_kg
      wikipedia
    }
    launchpads {
      name
      details
    }
  }
`;

export default DASHBOARD_DATA;
