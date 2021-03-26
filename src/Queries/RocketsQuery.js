import { gql } from "@apollo/client";

const ROCKETS_DATA = gql`
  query GetRocketsData {
    rockets {
      name
      mass {
        kg
      }
      cost_per_launch
      stages
      success_rate_pct
      active
      description
    }
  }
`;

export default ROCKETS_DATA;
