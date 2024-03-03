import { gql } from 'graphql-tag';

export const Rocket = gql`
  type PayloadWeight {
    id: String
    stringId: String
    name: String
    kg: Int
    lb: Int
  }

  type Rocket {
    id: ID!
    name: String
    description: String
    company: String
    costPerLaunch: Int
    stages: Int
    boosters: Int
    wikipedia: String
    payloadWeights: [PayloadWeight]
  }

  input RocketsInput {
    pagination: PaginationInput!
  }
`;
