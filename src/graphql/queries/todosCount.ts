import { gql } from '@apollo/client';

export const GET_TODOS_COUNT = gql`
    query {
    taskCounts {
      total 
      pending
      completed
    }
  }
`;
