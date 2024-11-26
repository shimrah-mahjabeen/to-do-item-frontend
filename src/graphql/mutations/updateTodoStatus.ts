import { gql } from '@apollo/client';

export const UPDATE_TODO_STATUS = gql`
mutation updateTaskStatus($input: UpdateTaskStatusInput!) {  
    updateTaskStatus(input: $input) {
      id
      success
      error
    }
  }
`;

