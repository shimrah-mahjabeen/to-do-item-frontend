import { gql } from '@apollo/client';

export const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTaskInput!) {
    createTask(input: $input) {
      task {
        id
        title
        description
        status
        dueOn
        createdAt
        updatedAt
      }
      errors
    }
  }
`;


