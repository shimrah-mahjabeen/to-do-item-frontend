import { gql } from '@apollo/client';

export const DELETE_TODO = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(input: { id: $id }) {
      id
      success
      errors
    }
  }
`;

