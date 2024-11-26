import { gql } from '@apollo/client';

export const UPDATE_TODO = gql`
mutation UpdateTask($input: UpdateTaskInput!) {  
  updateTask(input: $input) {
      task {
        id
        title
        description
        status
        dueOn
      }
      success
      error
    }
  }
`;

